export interface GetOrderHistorySelfResponseDto {
  /** 총 금액 */
  totalPrice: number;

  /** 주문한 메뉴들 */
  menus: {
    /** 메뉴 id */
    id: string;

    /** 메뉴명 */
    name: string;

    /** 가격 */
    price: number;
    
    /** 수량 */
    quantity: number;

    /** 주문 시각 */
    orderedAt: Date;
  }[];
}