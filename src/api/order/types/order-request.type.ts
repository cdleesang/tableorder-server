import typia from 'typia';

export interface GetAllOrderHistoriesQuery {
  /**
   * 입점 시각
   */
  enteredAt: string & typia.tags.Format<'date-time'>;
}

export interface OrderImmediatelyBody {
  /** 메뉴 아이디 */
  menuId: number;
  
  /** 메뉴 메인 옵션 아이디 */
  menuMainOptionId: number;

  /** 메뉴 개수 */
  amount: number;

  /** 총 가격(가격 * amount) */
  totalPrice: number;

  /** 서브 옵션 */
  menuSubOptions: {
    /** 서브 옵션 그룹 아이디 */
    optionGroupId: number;

    /** 서브 옵션 아이디 */
    optionId: number;
  }[];
}

export interface OrderCartBody {
  cartItems: {
    id: number;
    amount: number;
    price: number;
  }[];
}