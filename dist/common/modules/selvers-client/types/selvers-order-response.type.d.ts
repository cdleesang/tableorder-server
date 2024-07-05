import { NumericString } from 'src/common/types/numeric-string.type';
import { FoodId, OrderSheetId, SelversDateTime } from './selvers-client.type';
export interface OrderHistoryResponse {
    result: 'ok' | string;
    list: {
        Order: {
            id: NumericString;
            total_price: NumericString;
            created: SelversDateTime;
            order_seq: NumericString;
            OrderFoods: {
                OrderFood: {
                    id: FoodId;
                    price: NumericString;
                    amount: NumericString;
                    food_name: string;
                    food_price_opt_name: string;
                };
                OrderFoodOpt: {
                    food_opt_name: string;
                    food_opt_item_name: string;
                    food_opt_item_price: NumericString;
                }[];
                OrderFoodMaterialDatas: any[];
            }[];
        };
    }[];
}
export interface CreateOrderSheetResponse {
    result: 'ok' | string;
    message: string;
    order_id: OrderSheetId;
}
export interface OrderResponse {
    result: 'ok' | string;
    message: string;
}
