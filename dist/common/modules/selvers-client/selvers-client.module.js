"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelversClientModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_module_1 = require("../../../config/config.module");
const config_service_1 = require("../../../config/config.service");
const selvers_client_service_1 = require("./selvers-client.service");
let SelversClientModule = class SelversClientModule {
};
exports.SelversClientModule = SelversClientModule;
exports.SelversClientModule = SelversClientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: (configService) => ({
                    headers: {
                        'x-selvers-api-v2-access-token': configService.get('ACCESS_TOKEN'),
                    },
                }),
                inject: [config_service_1.ConfigService],
            }),
        ],
        providers: [
            selvers_client_service_1.SelversClientService,
        ],
        exports: [
            selvers_client_service_1.SelversClientService,
        ],
    })
], SelversClientModule);
//# sourceMappingURL=selvers-client.module.js.map