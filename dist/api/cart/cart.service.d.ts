import { ConfigService } from '../../config/config.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { SelversClientService } from '../../providers/selvers-client/selvers-client.service';
import { GetAllCartItems } from './types/cart-response.type';
export declare class CartService {
    private readonly configService;
    private readonly prismaService;
    private readonly selversClientService;
    constructor(configService: ConfigService, prismaService: PrismaService, selversClientService: SelversClientService);
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
