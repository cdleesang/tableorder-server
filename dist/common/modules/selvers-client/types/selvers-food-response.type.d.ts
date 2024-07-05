import { BooleanString } from 'src/common/types/boolean-string.type';
import { NumericString } from 'src/common/types/numeric-string.type';
import { FoodId, FoodOptionGroupId, FoodOptionId } from './selvers-client.type';
export interface MenuCategoryResponse {
    result: 'ok' | string;
    message: 'ok' | string;
    data: {
        StoreFoodDivision: {
            id: NumericString;
            division_name: string;
            children: {
                id: NumericString;
                division_name: string;
            }[];
        }[];
    };
}
interface Food {
    id: NumericString;
    food_name: string;
    en_food_name: string;
    price: NumericString;
    image_uri: string;
    sold_out_yn: BooleanString;
    ready_yn: BooleanString;
}
export interface ManyMenuResponse {
    result: 'ok' | string;
    message: 'ok' | string;
    page: NumericString;
    total_page: NumericString;
    data: {
        Food: Food;
    }[];
}
export interface NewStoreFoodsResponse {
    name?: string;
    message?: string;
    page: number;
    totalPage: number;
    list: {
        Food: Food;
    }[];
}
export interface MenuDetailResponse {
    result: 'ok' | string;
    food: {
        Food: {
            id: FoodId;
            food_name: string;
            en_food_name: string;
            price: NumericString;
            food_info: string;
            image_uri: string;
            approval_yn: BooleanString;
            sold_out_yn: BooleanString;
            FoodPriceOpt: {
                FoodPriceOpt: {
                    id: FoodOptionId;
                    opt_name: string;
                    en_opt_name: string;
                    opt_price: NumericString;
                };
            }[];
            FoodOpt: {
                id: FoodOptionGroupId;
                food_opt_name: string;
                en_food_opt_name: string;
                essential_yn: BooleanString;
                multi_yn: BooleanString;
                min_count: NumericString;
                max_count: NumericString;
                FoodOptItem: {
                    id: FoodOptionId;
                    food_opt_item_name: string;
                    en_food_opt_item_name: string;
                    food_opt_item_price: NumericString;
                    sold_out_yn: BooleanString;
                }[];
            }[];
        };
    };
}
export {};
