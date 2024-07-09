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
export interface GetAllOrderHistoriesResponseDto {
    totalSalesRevenue: number;
    orderHistories: OrderHistory[];
}
export {};
