import { BooleanString } from 'src/common/types/boolean-string.type';
import { NumericString } from 'src/common/types/numeric-string.type';
import { EasycallOptionId, StoreId, StoreName } from './selvers-client.type';
export interface EasycallSetupListResponse {
    result: 'ok' | string;
    message: string;
    items: {
        Store: {
            id: StoreId;
            store_name: StoreName;
        };
        EasyCallSetup: {
            id: EasycallOptionId;
            store_id: StoreId;
            title: string;
            quantity_yn: BooleanString;
            default_cnt: NumericString;
            emphasis_yn: BooleanString;
        };
        StoreOperation: {
            store_id: StoreId;
            easy_call_yn: BooleanString;
            staff_call_yn: BooleanString;
        };
    }[];
}
export interface EasycallCallStaffResponse {
    result: 'ok' | string;
    message: '간편호출이 신청(호출) 되었습니다.' | string;
}
