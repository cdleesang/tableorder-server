import { BooleanString } from '../../../common/types/boolean-string.type';
import { NumericString } from '../../../common/types/numeric-string.type';
import { EasycallOptionId, StoreId, StoreName } from './selvers-client.type';

export interface EasycallSetupListResponse {
  result: 'ok' | string;
  message: string;
  items: {
    /** 상점 정보 */
    Store: {
      id: StoreId,
      store_name: StoreName,
    },
    /** 직원호출 옵션 정보 */
    EasyCallSetup: {
      /** 직원호출 옵션 고유 아이디 */
      id: EasycallOptionId,
      store_id: StoreId,
      /** 직원호출 표시명 */
      title: string,
      /** 수량 선택 가능 여부 */
      quantity_yn: BooleanString,
      /** 기본 수량 */
      default_cnt: NumericString,
      /** 화면에 보일 때 강조된 스타일을 적용할지 여부 */
      emphasis_yn: BooleanString,
    },
    /** 상점 설정값 정보 */
    StoreOperation: {
      // 'id': '1754', 사용되지 않음
      store_id: StoreId,
      /** 직원호출 여부 */
      easy_call_yn: BooleanString,
      /** 직원호출 여부(사용되지 않음) */
      staff_call_yn: BooleanString,
    }
  }[];
}

export interface EasycallCallStaffResponse {
  result: 'ok' | string;
  message: '간편호출이 신청(호출) 되었습니다.' | string;
}