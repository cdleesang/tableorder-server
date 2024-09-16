import typia from 'typia';

export namespace GetAllOrderHistoriesDto {
  export interface Request {
    /**
     * 입점 시각
     */
    enteredAt: string & typia.tags.Format<'date-time'>;
  }

  export interface Response {
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
}