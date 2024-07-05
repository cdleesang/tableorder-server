"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const pos_repository_module_1 = require("../../common/modules/pos-repository/pos-repository.module");
const selvers_client_module_1 = require("../../common/modules/selvers-client/selvers-client.module");
const cart_module_1 = require("../cart/cart.module");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            selvers_client_module_1.SelversClientModule,
            cart_module_1.CartModule,
            pos_repository_module_1.PosRepositoryModule,
        ],
        controllers: [
            order_controller_1.OrderController,
        ],
        providers: [
            order_service_1.OrderService,
        ],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map