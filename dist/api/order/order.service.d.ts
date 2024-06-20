import typia from 'typia';
import { ConfigService } from '../../config/config.service';
import { SelversClientService } from '../../providers/selvers-client/selvers-client.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { OrderImmediatelyBody } from './types/order-request.type';
import { GetAllOrderHistoriesResponse, GetOrderHistoriesByTableId } from './types/order-response.type';
import { PosHTableRepository } from '../../providers/pos-repository/pos-h-table.repository';
export declare class OrderService {
    private readonly configService;
    private readonly prismaService;
    private readonly selversClientService;
    private readonly cartService;
    private readonly posHTableRepository;
    constructor(configService: ConfigService, prismaService: PrismaService, selversClientService: SelversClientService, cartService: CartService, posHTableRepository: PosHTableRepository);
    getAllOrderHistories(tableId: number, enteredAt: string & typia.tags.Format<'date-time'>): Promise<GetAllOrderHistoriesResponse>;
    getOrderHistoriesByTableId(loggedInTableId: number, tableId: number): Promise<GetOrderHistoriesByTableId>;
    orderImmediately(tableId: number, body: OrderImmediatelyBody): Promise<true>;
    order(tableId: number, cartItems: {
        id: number;
        amount: number;
        price: number;
    }[]): Promise<true>;
}
