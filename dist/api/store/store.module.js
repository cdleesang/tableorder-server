"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const selvers_client_module_1 = require("../../providers/selvers-client/selvers-client.module");
const store_controller_1 = require("./store.controller");
const store_service_1 = require("./store.service");
const notification_module_1 = require("../notification/notification.module");
let StoreModule = class StoreModule {
};
exports.StoreModule = StoreModule;
exports.StoreModule = StoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            selvers_client_module_1.SelversClientModule,
            schedule_1.ScheduleModule.forRoot(),
            notification_module_1.NotificationModule,
        ],
        controllers: [
            store_controller_1.StoreController,
        ],
        providers: [
            store_service_1.StoreService,
        ],
    })
], StoreModule);
//# sourceMappingURL=store.module.js.map