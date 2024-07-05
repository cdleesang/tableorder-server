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
const call_staff_module_1 = require("./v1/call-staff/call-staff.module");
const cart_module_1 = require("./v1/cart/cart.module");
const menu_module_1 = require("./v1/menu/menu.module");
const notification_module_1 = require("./v1/notification/notification.module");
const order_module_1 = require("./v1/order/order.module");
const order_module_2 = require("./order/order.module");
const store_module_1 = require("./v1/store/store.module");
const config_module_1 = require("./config/config.module");
const prisma_module_1 = require("./common/modules/prisma/prisma.module");
const admin_module_1 = require("./admin/admin.module");
const table_module_1 = require("./table/table.module");
const auth_module_1 = require("./auth/auth.module");
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
            admin_module_1.AdminModule,
            table_module_1.TableModule,
            order_module_2.OrderModule,
            auth_module_1.AuthModule,
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