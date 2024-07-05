export declare class Menu {
    readonly id: string;
    name: string;
    price: number;
    quantity: number;
    readonly orderedAt: Date;
    constructor(id: string, name: string, price: number, quantity: number, orderedAt?: Date);
    get totalPrice(): number;
}
