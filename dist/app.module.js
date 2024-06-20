"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const call_staff_module_1 = require("./api/call-staff/call-staff.module");
const cart_module_1 = require("./api/cart/cart.module");
const menu_module_1 = require("./api/menu/menu.module");
const notification_module_1 = require("./api/notification/notification.module");
const order_module_1 = require("./api/order/order.module");
const store_module_1 = require("./api/store/store.module");
const config_module_1 = require("./config/config.module");
const prisma_module_1 = require("./providers/prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'customer-frontend'),
            }),
            prisma_module_1.PrismaModule,
            config_module_1.ConfigModule,
            call_staff_module_1.CallStaffModule,
            menu_module_1.MenuModule,
            cart_module_1.CartModule,
            store_module_1.StoreModule,
            order_module_1.OrderModule,
            notification_module_1.NotificationModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map