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