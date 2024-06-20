export interface AddCartItemBody {
    menuId: number;
    menuMainOptionId: number;
    amount: number;
    totalPrice: number;
    menuSubOptions: {
        optionGroupId: number;
        optionId: number;
    }[];
}
