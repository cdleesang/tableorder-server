import { SelversWWWClient } from './selvers-www-client';
import { CartItemCountResponse } from '../types/selvers-cart-response.type';
export declare class SelversCartClient extends SelversWWWClient {
    getCartItemCount(memberId: string): Promise<CartItemCountResponse>;
    getManyCartItem(memberId: string, page: number): Promise<{
        list: {
            Cart: {
                Food: {
                    image_uri: string;
                    id: string;
                    food_name: string;
                    price: string;
                };
                id: string;
                member_id: string;
                store_id: string;
                amount: string;
                price: string;
                CartFood: {
                    food_id: string;
                    food_price_opt_id: string;
                };
                FoodPriceOpt: {
                    opt_name: string;
                    opt_price: string;
                };
                FoodOpt: {
                    id: string;
                    food_opt_name: string;
                    FoodOptItem: {
                        id: string;
                        food_opt_item_name: string;
                        food_opt_item_price: string;
                    };
                }[];
            };
        }[];
        message?: string | undefined;
        page: string;
        totalPage: number;
    }>;
    addItem(storeId: string, memberId: string, food: {
        id: string;
        amount: number;
        price: number;
        priceOptionId: string;
        options: {
            id: string;
            itemId: string;
        }[];
    }): Promise<true>;
    deleteItem(memberId: string, cartId: string): Promise<true>;
    clearCart(memberId: string): Promise<true>;
}
