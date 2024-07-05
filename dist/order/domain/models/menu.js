"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
class Menu {
    id;
    name;
    price;
    quantity;
    orderedAt;
    constructor(id, name, price, quantity, orderedAt = new Date()) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.orderedAt = orderedAt;
    }
    get totalPrice() {
        return this.quantity * this.price;
    }
}
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map