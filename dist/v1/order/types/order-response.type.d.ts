export interface GetAllOrderHistoriesResponse {
    orderHistories: {
        id: number;
        totalPrice: number;
        createdAt: Date;
        orderSeq: number;
        menus: {
            id: number;
            totalPrice: number;
            amount: number;
            name: string;
            mainOptionName: string;
            subOptionGroups: {
                groupName: string;
                optionName: string;
                optionPrice: number;
            }[];
        }[];
    }[];
}
export interface GetOrderHistoriesByTableId {
    orderHistories: {
        stockName: string;
        amount: number;
        quantity: number;
        orderTime: Date;
    }[];
}
