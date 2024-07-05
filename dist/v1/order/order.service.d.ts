import typia from 'typia';
import { ConfigService } from '../../config/config.service';
import { CartService } from '../cart/cart.service';
import { OrderImmediatelyBody } from './types/order-request.type';
import { GetAllOrderHistoriesResponse, GetOrderHistoriesByTableId } from './types/order-response.type';
import { PosHTableRepository } from '../../common/modules/pos-repository/pos-h-table.repository';
import { LegacyPrismaService } from '../../common/modules/prisma/legacy-prisma.service';
import { SelversClientService } from '../../common/modules/selvers-client/selvers-client.service';
export declare class OrderService {
    private readonly configService;
    private readonly prismaService;
    private readonly selversClientService;
    private readonly cartService;
    private readonly posHTableRepository;
    constructor(configService: ConfigService, prismaService: LegacyPrismaService, selversClientService: SelversClientService, cartService: CartService, posHTableRepository: PosHTableRepository);
    getAllOrderHistories(tableId: number, enteredAt: string & typia.tags.Format<'date-time'>): Promise<GetAllOrderHistoriesResponse>;
    getOrderHistoriesByTableId(loggedInTableId: number, tableId: number): Promise<GetOrderHistoriesByTableId>;
    orderImmediately(tableId: number, body: OrderImmediatelyBody): Promise<true>;
    order(tableId: number, cartItems: {
        id: number;
        amount: number;
        price: number;
    }[]): Promise<true>;
}
