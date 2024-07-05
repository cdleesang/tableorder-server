import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { Table } from 'src/auth/domain/models/table';
import { ViewAllOrderHistoriesService } from 'src/order/domain/services/view-all-order-histories.service';
import { ViewOrderHistorySelfService } from 'src/order/domain/services/view-order-history-self.service';
import { GetAllOrderHistoriesResponseDto } from './dto/get-all-order-histories.dto';
import { GetOrderHistorySelfResponseDto } from './dto/get-order-history-self.dto';
export declare class OrderController {
    private readonly viewAllOrderHistoriesService;
    private readonly viewOrderHistorySelfService;
    constructor(viewAllOrderHistoriesService: ViewAllOrderHistoriesService, viewOrderHistorySelfService: ViewOrderHistorySelfService);
    getAllOrderHistories(authority: AdminAuthority): Promise<GetAllOrderHistoriesResponseDto>;
    getOrderHistorySelf(authority: Table): Promise<GetOrderHistorySelfResponseDto>;
}
