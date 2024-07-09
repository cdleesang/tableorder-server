import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
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
    }>;
};
export declare class ViewAllOrderHistoriesService {
    private readonly tableOrderHistoryRepository;
    private readonly canAdminAccessService;
    constructor(tableOrderHistoryRepository: TableOrderHistoryRepository, canAdminAccessService: CanAdminAccessService);
    execute(authority: AdminAuthority): Promise<Response>;
}
export {};
