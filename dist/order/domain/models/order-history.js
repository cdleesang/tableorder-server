"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHistory = void 0;
class OrderHistory {
    tableId;
    tableName;
    menus;
    constructor(tableId, tableName, menus) {
        this.tableId = tableId;
        this.tableName = tableName;
        this.menus = menus;
    }
    addMenu(menu) {
        this.menus.push(menu);
    }
    get totalPrice() {
        return this.menus.reduce((acc, menu) => acc + menu.totalPrice, 0);
    }
}
exports.OrderHistory = OrderHistory;
//# sourceMappingURL=order-history.js.map