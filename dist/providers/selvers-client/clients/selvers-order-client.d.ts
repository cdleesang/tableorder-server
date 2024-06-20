import { NumericString } from '../../../common/types/numeric-string.type';
import { CartId, OrderSheetId, StoreId } from '../types/selvers-client.type';
import { CreateOrderSheetResponse, OrderHistoryResponse } from '../types/selvers-order-response.type';
import { SelversWWWClient } from './selvers-www-client';
export declare class SelversOrderClient extends SelversWWWClient {
    getOrderHistory(storeId: StoreId, storeTableId: string, createdAt?: Date): Promise<OrderHistoryResponse>;
    private filterOrderHistoryAfterCreatedAt;
    private selversDateTimeToJsDate;
    createOrderSheet(storeId: StoreId, storeTableId: NumericString, memberId: NumericString, totalPrice: NumericString, carts: {
        id: CartId;
        amount: NumericString;
        price: NumericString;
    }[]): Promise<CreateOrderSheetResponse>;
    order(storeId: StoreId, memberId: NumericString, orderSheetId: OrderSheetId, cartIdsToDelete?: CartId[]): Promise<boolean>;
}
