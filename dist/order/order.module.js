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
const auth_module_1 = require("../auth/auth.module");
const firebird_module_1 = require("../common/modules/firebird/firebird.module");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const order_controller_1 = require("./adapters/in/web/order.controller");
const table_order_history_repository_impl_1 = require("./adapters/out/database/table-order-history-repository-impl");
const view_all_order_histories_service_1 = require("./domain/services/view-all-order-histories.service");
const view_order_history_self_service_1 = require("./domain/services/view-order-history-self.service");
const order_history_repository_1 = require("./ports/out/order-history-repository");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            firebird_module_1.FirebirdModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: (configService) => ({
                    host: configService.get('POS_DATABASE_HOST'),
                    port: parseInt(configService.get('POS_DATABASE_PORT'), 10),
                    database: configService.get('POS_DATABASE_FILE_PATH'),
                    user: configService.get('POS_DATABASE_USER'),
                    password: configService.get('POS_DATABASE_PASSWORD'),
                }),
                inject: [config_service_1.ConfigService],
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [
            order_controller_1.OrderController,
        ],
        providers: [
            view_all_order_histories_service_1.ViewAllOrderHistoriesService,
            view_order_history_self_service_1.ViewOrderHistorySelfService,
            { provide: order_history_repository_1.TableOrderHistoryRepository, useClass: table_order_history_repository_impl_1.TableOrderHistoryRepositoryImpl },
        ],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map