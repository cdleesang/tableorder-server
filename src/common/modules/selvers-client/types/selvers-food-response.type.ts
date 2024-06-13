import { BooleanString } from 'src/common/types/boolean-string.type';
import { NumericString } from 'src/common/types/numeric-string.type';
import { FoodId, FoodOptionGroupId, FoodOptionId } from './selvers-client.type';

export interface MenuCategoryResponse {
  result: 'ok' | string;
  message: 'ok' | string;
  data: {
    StoreFoodDivision: {
      id: NumericString,
      division_name: string,
      children: {
        id: NumericString,
        division_name: string,
      }[],
    }[]
  }
}

interface Food {
  id: NumericString,
  food_name: string,
  en_food_name: string,
  price: NumericString,
  /** full path가 아님, 변환 필요 */
  image_uri: string,
  /** 품절 여부 */
  sold_out_yn: BooleanString,
  /** 준비중 여부(준비중이 Y라면, 품절 여부도 Y로 표시됨) */
  ready_yn: BooleanString,
}

export interface ManyMenuResponse {
  result: 'ok' | string;
  message: 'ok' | string;
  page: NumericString;
  total_page: NumericString;
  data: {Food: Food}[];
}

export interface NewStoreFoodsResponse {
  name?: string;
  message?: string;
  page: number;
  totalPage: number;
  list: {Food: Food}[];
}

export interface MenuDetailResponse {
  result: 'ok' | string;
  food: {
    Food: {
      id: FoodId,
      food_name: string,
      en_food_name: string,
      price: NumericString,
      /** 셀버스 앱의 가격 하단에 위치한 음식 정보 */
      food_info: string,
      /** full path가 아님, 변환 필요 */
      image_uri: string,
      /** 활성화(노출) 여부 */
      approval_yn: BooleanString,
      /** 품절 여부 */
      sold_out_yn: BooleanString,
      /** 품목 라디오버튼 선택 */
      FoodPriceOpt: {
        FoodPriceOpt: {
          id: FoodOptionId,
          opt_name: string,
          en_opt_name: string,
          opt_price: NumericString,
        }
      }[],
      /** 추가 옵션 */
      FoodOpt: {
        id: FoodOptionGroupId,
        food_opt_name: string,
        en_food_opt_name: string,
        /** 필수 선택 여부 */
        essential_yn: BooleanString,
        /** 다중 선택 가능 여부 */
        multi_yn: BooleanString,
        /** 최소 다중 선택 개수(-1일 경우 무제한) */
        min_count: NumericString,
        /** 최대 다중 선택 개수(-1일 경우 무제한) */
        max_count: NumericString,
        FoodOptItem: {
          id: FoodOptionId,
          food_opt_item_name: string,
          en_food_opt_item_name: string,
          food_opt_item_price: NumericString,
          sold_out_yn: BooleanString,
        }[];
      }[];
    },
  },
}