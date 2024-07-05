import { Table } from 'src/auth/domain/models/table';
import { TableOrderHistoryRepository } from 'src/order/ports/out/order-history-repository';
interface Response {
    totalPrice: number;
    menus: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        orderedAt: Date;
    }[];
}
export declare class ViewOrderHistorySelfService {
    private readonly tableOrderHistoryRepository;
    constructor(tableOrderHistoryRepository: TableOrderHistoryRepository);
    execute(authority: Table): Promise<Response>;
}
export {};
