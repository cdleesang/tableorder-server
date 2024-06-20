import { OrderService } from './order.service';
import { GetAllOrderHistoriesQuery, OrderCartBody, OrderImmediatelyBody } from './types/order-request.type';
import { GetAllOrderHistoriesResponse, GetOrderHistoriesByTableId } from './types/order-response.type';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAllOrderHistories(tableId: number, query: GetAllOrderHistoriesQuery): Promise<GetAllOrderHistoriesResponse>;
    getOrderHistoriesByTableId(loggedInTableId: number, tableId: number): Promise<GetOrderHistoriesByTableId>;
    orderImmediately(tableId: number, body: OrderImmediatelyBody): Promise<true>;
    orderCart(tableId: number, body: OrderCartBody): Promise<true>;
}
