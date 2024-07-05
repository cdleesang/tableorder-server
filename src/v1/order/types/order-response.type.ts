export interface GetAllOrderHistoriesResponse {
  orderHistories: {
    id: number;
    totalPrice: number;
    createdAt: Date;
    /** 주문 번호 */
    orderSeq: number;
    menus: {
      id: number;
      /** amount를 곱한 가격 */
      totalPrice: number;
      amount: number;
      name: string;
      mainOptionName: string;
      subOptionGroups: {
        groupName: string;
        optionName: string;
        optionPrice: number;
      }[],
    }[],
  }[];
}

export interface GetOrderHistoriesByTableId {
  orderHistories: {
    /** 상품명 */
    stockName: string;

    /** 상품 단가 */
    amount: number;

    /** 주문 수량 */
    quantity: number;
    
    /** 주문 시간 */
    orderTime: Date;
  }[];
}