interface OrderHistory {
  /** 테이블 id */
  tableId: string;

  /** 테이블명 */
  tableName: string;

  /** 총 금액 */
  totalPrice: number;

  /** 주문한 메뉴들 */
  menus: {
    /** 메뉴명 */
    name: string;

    /** 가격 */
    price: number;
    
    /** 수량 */
    quantity: number;
  }[];
}

export interface GetAllOrderHistoriesResponseDto {
  /** 총 매출액 */
  totalSalesRevenue: number;

  /** 주문 이력들 */
  orderHistories: OrderHistory[];
}