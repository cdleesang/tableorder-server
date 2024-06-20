"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelversOrderClient = void 0;
const response_error_handle_util_1 = require("../utils/response-error-handle.util");
const selvers_www_client_1 = require("./selvers-www-client");
class SelversOrderClient extends selvers_www_client_1.SelversWWWClient {
    async getOrderHistory(storeId, storeTableId, createdAt) {
        const url = this.genFullPath('/order/api_table_order_orders.json');
        const orderHistory = await (0, response_error_handle_util_1.responseErrorHandle)('주문내역 조회', this.httpService.get(url, {
            params: {
                store_id: storeId,
                store_table_id: storeTableId,
            },
        }), { storeTableId });
        return createdAt
            ? this.filterOrderHistoryAfterCreatedAt(orderHistory, createdAt)
            : orderHistory;
    }
    filterOrderHistoryAfterCreatedAt(orderHistory, createdAt) {
        const search = (left, right) => {
            if (left > right)
                return left;
            const mid = Math.floor((left + right) / 2);
            const currentCreatedAt = this.selversDateTimeToJsDate(orderHistory.list[mid].Order.created);
            return currentCreatedAt.getTime() > createdAt.getTime()
                ? search(left, mid - 1)
                : search(mid + 1, right);
        };
        const index = search(0, orderHistory.list.length - 1);
        return {
            result: orderHistory.result,
            list: index !== -1 ? orderHistory.list.slice(index) : [],
        };
    }
    selversDateTimeToJsDate(dateTime) {
        const koreanStandardTime = '+09:00';
        return new Date(dateTime.replace(' ', 'T') + koreanStandardTime);
    }
    async createOrderSheet(storeId, storeTableId, memberId, totalPrice, carts) {
        const url = this.genFullPath('/order/bg_add_before.json');
        const params = new URLSearchParams();
        params.append('store_id', storeId);
        params.append('store_table_id', storeTableId);
        params.append('member_id', memberId);
        params.append('total_price', totalPrice);
        params.append('price', totalPrice);
        params.append('requests', '');
        params.append('pickup_type', '1');
        params.append('commission', '0');
        params.append('pay_division', 'C');
        params.append('order_type', '2');
        params.append('use_point', '0');
        params.append('payment_type', '4');
        params.append('delivery_addr', '');
        params.append('order_method', 'T');
        params.append('reserv_time', '');
        params.append('pickup_time', '');
        carts.forEach((cart, index) => {
            params.append(`cart_id[${index}]`, cart.id);
            params.append(`cart_amount[${index}]`, cart.amount);
            params.append(`cart_price[${index}]`, cart.price);
        });
        return await (0, response_error_handle_util_1.responseErrorHandle)('메뉴 주문서 작성', this.httpService.post(url, params), {
            storeTableId,
            memberId,
            totalPrice,
            carts: JSON.stringify(carts),
        });
    }
    async order(storeId, memberId, orderSheetId, cartIdsToDelete = []) {
        const url = this.genFullPath('/order/bg_add_after.json');
        const params = new URLSearchParams();
        params.append('store_id', storeId);
        params.append('member_id', memberId);
        params.append('order_id', orderSheetId);
        params.append('payment_yn', 'N');
        params.append('p_type', '');
        cartIdsToDelete.forEach((cartId, index) => {
            params.append(`cart_id[${index}]`, cartId);
        });
        await (0, response_error_handle_util_1.responseErrorHandle)('상품 주문', this.httpService.post(url, params), {
            memberId,
            orderSheetId,
        });
        return true;
    }
}
exports.SelversOrderClient = SelversOrderClient;
//# sourceMappingURL=selvers-order-client.js.map