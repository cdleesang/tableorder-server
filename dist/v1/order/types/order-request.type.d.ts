import typia from 'typia';
export interface GetAllOrderHistoriesQuery {
    enteredAt: string & typia.tags.Format<'date-time'>;
}
export interface OrderImmediatelyBody {
    menuId: number;
    menuMainOptionId: number;
    amount: number;
    totalPrice: number;
    menuSubOptions: {
        optionGroupId: number;
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
