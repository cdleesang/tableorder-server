export interface GetOrderHistorySelfResponseDto {
    totalPrice: number;
    menus: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        orderedAt: Date;
    }[];
}
