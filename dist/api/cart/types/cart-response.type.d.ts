import typia from 'typia';
interface CartItem {
    id: number;
    menuId: number;
    menuName: string;
    menuAmount: number;
    menuTotalPrice: number;
    imageUrl: string & typia.tags.Format<'url'>;
    menuMainOption: {
        id: number;
        price: number;
        name: string;
    };
    menuSubOptions: {
        groupId: number;
        groupName: string;
        optionId: number;
        optionName: string;
        optionPrice: number;
    }[];
}
export interface GetAllCartItems {
    cartItems: CartItem[];
}
export {};
