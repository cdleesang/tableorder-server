interface CartItem {
  /** 아이템의 아이디(주문 시 해당 아이디로 주문해야함) */
  id: number;
  
  /** 메뉴 고유 아이디 */
  menuId: number;
  
  /** 메뉴명 */
  menuName: string;
  
  /** 메뉴 개수 */
  menuAmount: number;

  /** 총 가격(메뉴의 옵션가까지 모두 더한 가격 * 개수) */
  menuTotalPrice: number;

  /** 메뉴 사진 */
  imageUrl: string;
  
  /** 메뉴 메인 옵션 */
  menuMainOption: {
    /** 메뉴 메인 옵션 아이디 */
    id: number;

    /** 메뉴 메인 옵션 가격 */
    price: number;

    /** 메뉴 메인 옵션명 */
    name: string;
  }

  /** 메뉴 서브 옵션들 */
  menuSubOptions: {
    /** 메뉴 서브 옵션 그룹 아이디 */
    groupId: number;

    /** 메뉴 서브 옵션 그룹명 */
    groupName: string;

    /** 메뉴 서브 옵션 아이디 */
    optionId: number;

    /** 메뉴 서브 옵션명 */
    optionName: string;

    /** 메뉴 서브 옵션 가격 */
    optionPrice: number;
  }[];
}

export interface GetPaginatedCartItems {
  totalPage: number;
  cartItems: CartItem[];
}

