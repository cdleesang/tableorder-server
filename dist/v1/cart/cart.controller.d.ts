import { CartService } from './cart.service';
import { AddCartItemBody } from './types/cart-request.type';
import { GetAllCartItems } from './types/cart-response.type';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getAllCartItems(tableId: number): Promise<GetAllCartItems>;
    addItem(tableId: number, body: AddCartItemBody): Promise<number>;
    deleteItemById(tableId: number, itemId: number): Promise<true>;
    clearCart(tableId: number): Promise<true>;
}
