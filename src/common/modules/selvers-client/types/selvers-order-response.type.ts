import { NumericString } from 'src/common/types/numeric-string.type';
import { FoodId, OrderSheetId, SelversDateTime } from './selvers-client.type';

export interface OrderHistoryResponse {
  result: 'ok' | string;
  list: {
    Order: {
      id: NumericString,
      total_price: NumericString,
      created: SelversDateTime,
      /** 주문 번호 */
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
        /** 커스텀으로 유추됨, 확인할 수 없음 */
        OrderFoodMaterialDatas: any[];
      }[];
    }
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