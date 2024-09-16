export namespace GetOrderHistoriesByTableIdDto {
  export interface Response {
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
}