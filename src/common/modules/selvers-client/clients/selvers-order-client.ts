import { NumericString } from 'src/common/types';
import { CartId, CreateOrderSheetResponse, OrderHistoryResponse, OrderResponse, OrderSheetId, SelversDateTime, StoreId } from '../types';
import { responseErrorHandle } from '../utils';
import { SelversWWWClient } from './selvers-www-client';

export class SelversOrderClient extends SelversWWWClient {
  /**
   * 주문내역 조회
   */
  async getOrderHistory(storeId: StoreId, storeTableId: string, createdAt?: Date) {
    const url = this.genFullPath('/order/api_table_order_orders.json');

    const orderHistory = await responseErrorHandle(
      '주문내역 조회',
      this.httpService.get<OrderHistoryResponse>(url, {
        params: {
          store_id: storeId,
          store_table_id: storeTableId,
        },
      }),
      {storeTableId},
    );

    return createdAt
      ? this.filterOrderHistoryAfterCreatedAt(orderHistory, createdAt)
      : orderHistory;
  }

  /**
   * 특정일 후의 주문 내역만 필터링하는 함수
   */
  private filterOrderHistoryAfterCreatedAt(orderHistory: OrderHistoryResponse, createdAt: Date): OrderHistoryResponse {
    const search = (left: number, right: number): number => {
      if(left > right) return left;

      const mid = Math.floor((left + right) / 2);
      const currentCreatedAt = this.selversDateTimeToJsDate(orderHistory.list[mid].Order.created);
        
      return currentCreatedAt.getTime() > createdAt.getTime()
        ? search(left, mid-1)
        : search(mid+1, right);
    };

    const index = search(0, orderHistory.list.length - 1);
    
    return {
      result: orderHistory.result,
      list: index !== -1 ? orderHistory.list.slice(index) : [],
    };
  }

  private selversDateTimeToJsDate(dateTime: SelversDateTime) {
    const koreanStandardTime = '+09:00';
    return new Date(dateTime.replace(' ', 'T')+koreanStandardTime);
  }

  /**
   * 주문서 작성
   */
  async createOrderSheet(
    storeId: StoreId,
    storeTableId: NumericString,
    memberId: NumericString,
    totalPrice: NumericString,
    carts: {
      id: CartId,
      amount: NumericString,
      price: NumericString,
    }[],
  ) {
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

    return await responseErrorHandle(
      '메뉴 주문서 작성',
      this.httpService.post<CreateOrderSheetResponse>(url, params),
      {
        storeTableId,
        memberId,
        totalPrice,
        carts: JSON.stringify(carts),
      },
    );
  }

  /**
   * 주문
   */
  async order(
    storeId: StoreId,
    memberId: NumericString,
    orderSheetId: OrderSheetId,
    cartIdsToDelete: CartId[] = [],
  ) {
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

    await responseErrorHandle(
      '상품 주문',
      this.httpService.post<OrderResponse>(url, params),
      {
        memberId,
        orderSheetId,
      },
    );

    return true;
  }
}