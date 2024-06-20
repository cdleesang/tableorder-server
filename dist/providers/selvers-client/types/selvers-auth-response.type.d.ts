import { NumericString } from '../../../common/types/numeric-string.type';
import { TableId } from './selvers-client.type';
export interface TableLoginResponse {
    result: 'ok' | string;
    member: {
        Member: {
            id: NumericString;
        };
        StoreTable: {
            seq: TableId;
            id: NumericString;
        };
        Store: {
            id: NumericString;
        };
    };
}
