import { NumericString } from '../../../common/types/numeric-string.type';
import { CartId, FoodId, FoodOptionGroupId, FoodOptionId, StoreId } from './selvers-client.type';

export interface CartItemCountResponse {
  count: number;
}

export interface CartIndexResponse {
  message?: string;
  page: NumericString;
  totalPage: number;
  list: {
    Cart: {
      id: CartId;
      member_id: NumericString;
      store_id: StoreId;
      amount: NumericString;
      price: NumericString;
      CartFood: {
        food_id: FoodId;
        food_price_opt_id: FoodOptionId;
      };
      Food: {
        id: FoodId;
        food_name: string;
        price: NumericString;
        image_uri: string;
      };
      FoodPriceOpt: {
        opt_name: string;
        opt_price: NumericString;
      };
      FoodOpt: {
        id: FoodOptionGroupId;
        food_opt_name: string;
        FoodOptItem: {
          id: FoodOptionId;
          food_opt_item_name: string;
          food_opt_item_price: NumericString;
        };
      }[];
    }
  }[];
}

export interface BaseCartResponse {
  result: 'ok';
}