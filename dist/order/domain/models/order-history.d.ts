import { Menu } from './menu';
export declare class OrderHistory {
    readonly tableId: string;
    readonly tableName: string;
    menus: Menu[];
    constructor(tableId: string, tableName: string, menus: Menu[]);
    addMenu(menu: Menu): void;
    get totalPrice(): number;
}
