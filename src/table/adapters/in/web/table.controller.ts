import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { UseAdminGuard } from 'src/auth/utils/decorators/use-admin-guard.decorator';
import { TableService } from 'src/table/domain/services/table.service';
import { ViewAllTablesResponseDto } from './dto/view-all-tables.dto';

@Controller({path: 'table', version: 'api'})
export class TableController {
  constructor(
    private readonly tableService: TableService,
  ) {}

  /**
   * 모든 테이블 조회.
   * 
   * @tag 테이블
   * @security admin
   */
  @TypedRoute.Get('/')
  @UseAdminGuard()
  async viewAllTables(): Promise<ViewAllTablesResponseDto> {
    return this.tableService.viewAllTables();
  }
}