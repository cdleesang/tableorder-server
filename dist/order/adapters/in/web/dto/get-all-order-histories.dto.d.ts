interface OrderHistory {
    tableId: string;
    tableName: string;
    totalPrice: number;
    menus: {
        name: string;
        price: number;
        quantity: number;
    }[];
}
export type GetAllOrderHistoriesResponseDto = OrderHistory[];
export {};
