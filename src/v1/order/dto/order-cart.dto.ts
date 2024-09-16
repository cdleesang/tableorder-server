export namespace OrderCartDto {
  export interface Request {
    cartItems: {
      id: number;
      amount: number;
      price: number;
    }[];
  }
}