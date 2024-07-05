import { ConfigService } from '../../config/config.service';
import { GetAllCartItems } from './types/cart-response.type';
import { LegacyPrismaService } from '../../common/modules/prisma/legacy-prisma.service';
import { SelversClientService } from '../../common/modules/selvers-client/selvers-client.service';
export declare class CartService {
    private readonly configService;
    private readonly prismaService;
    private readonly selversClientService;
    constructor(configService: ConfigService, prismaService: LegacyPrismaService, selversClientService: SelversClientService);
    getAllCartItems(tableId: number): Promise<GetAllCartItems>;
    addItem(tableId: number, menu: {
        id: number;
        mainOptionId: number;
        amount: number;
        totalPrice: number;
        subOptions: {
            optionGroupId: number;
            optionId: number;
        }[];
    }): Promise<number>;
    deleteItemById(tableId: number, itemId: number): Promise<true>;
    clearCart(tableId: number): Promise<true>;
}
