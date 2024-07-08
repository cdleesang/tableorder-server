import { Inject, Injectable } from '@nestjs/common';
import { AdminPermissionDeniedError } from 'src/auth/domain/errors/admin-permission-denied-error';
import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminPermission } from 'src/auth/domain/models/admin-permission';
import { CanAdminAccessService } from 'src/auth/domain/services';
import { TableOrderHistoryRepository } from 'src/order/ports/out/order-history-repository';

type Response = {
  totalSalesRevenue: number;
  orderHistories: Array<{
    tableId: string;
    tableName: string;
    totalPrice: number;
    menus: {
      name: string;
      price: number;
      quantity: number;
    }[];
  }>
};

@Injectable()
export class ViewAllOrderHistoriesService {
  constructor(
    @Inject(TableOrderHistoryRepository) private readonly tableOrderHistoryRepository: TableOrderHistoryRepository,
    private readonly canAdminAccessService: CanAdminAccessService,
  ) {}

  /**
   * @throws {AdminPermissionDeniedError}
   */
  async execute(authority: AdminAuthority): Promise<Response> {
    const isAccessible = await this.canAdminAccessService.execute(authority, AdminPermission.VIEW_ORDER);

    if(!isAccessible) {
      throw new AdminPermissionDeniedError();
    }

    const [totalSalesRevenue, orderHistories] = await Promise.all([
      this.tableOrderHistoryRepository.totalSalesRevenue(),
      this.tableOrderHistoryRepository.findAll(),
    ]);

    return { totalSalesRevenue, orderHistories };
  }
}