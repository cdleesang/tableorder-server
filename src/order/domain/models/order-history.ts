import { Menu } from './menu';

export class OrderHistory {
  constructor(
    public readonly tableId: string,
    public readonly tableName: string,
    public menus: Menu[],
  ) {}

  addMenu(menu: Menu): void {
    this.menus.push(menu);
  }

  get totalPrice(): number {
    return this.menus.reduce((acc, menu) => acc + menu.totalPrice, 0);
  }
}