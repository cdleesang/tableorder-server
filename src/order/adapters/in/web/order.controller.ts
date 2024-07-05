import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { Table } from 'src/auth/domain/models/table';
import { CurrentAdmin } from 'src/auth/utils/decorators/current-admin.decorator';
import { CurrentTable } from 'src/auth/utils/decorators/current-table.decorator';
import { UseAdminGuard } from 'src/auth/utils/decorators/use-admin-guard.decorator';
import { UseTableGuard } from 'src/auth/utils/decorators/use-table-guard.decorator';
import { UseAdminPermissionDeniedExceptionFilter } from 'src/auth/utils/filters/admin-permission-denied-exception.filter';
import { ViewAllOrderHistoriesService } from 'src/order/domain/services/view-all-order-histories.service';
import { ViewOrderHistorySelfService } from 'src/order/domain/services/view-order-history-self.service';
import { GetAllOrderHistoriesResponseDto } from './dto/get-all-order-histories.dto';
import { GetOrderHistorySelfResponseDto } from './dto/get-order-history-self.dto';

@Controller({path: 'order', version: 'api'})
export class OrderController {
  constructor(
    private readonly viewAllOrderHistoriesService: ViewAllOrderHistoriesService,
    private readonly viewOrderHistorySelfService: ViewOrderHistorySelfService,
  ) {}

  /**
   * 모든 테이블에 대한 주문내역 조회.
   * - 관리자: 주문내역 조회 권한 필요
   * 
   * @tag 주문
   * @security admin
   */
  @TypedRoute.Get('history')
  @UseAdminGuard()
  @UseAdminPermissionDeniedExceptionFilter()
  async getAllOrderHistories(@CurrentAdmin() authority: AdminAuthority): Promise<GetAllOrderHistoriesResponseDto> {
    return this.viewAllOrderHistoriesService.execute(authority);
  }

  /**
   * 로그인한 테이블에 대한 주문내역 조회.
   * 
   * @tag 주문
   * @security table
   */
  @TypedRoute.Get('history/self')
  @UseTableGuard()
  async getOrderHistorySelf(@CurrentTable() authority: Table): Promise<GetOrderHistorySelfResponseDto> {
    return this.viewOrderHistorySelfService.execute(authority);
  }
}