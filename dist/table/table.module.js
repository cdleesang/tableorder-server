"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const firebird_module_1 = require("../common/modules/firebird/firebird.module");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const table_controller_1 = require("./adapters/in/web/table.controller");
const table_repository_impl_1 = require("./adapters/out/database/table-repository-impl");
const get_table_name_by_id_service_1 = require("./domain/services/get-table-name-by-id.service");
const table_service_1 = require("./domain/services/table.service");
const table_repository_1 = require("./ports/out/table-repository");
let TableModule = class TableModule {
};
exports.TableModule = TableModule;
exports.TableModule = TableModule = __decorate([
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
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [
            table_controller_1.TableController,
        ],
        providers: [
            table_service_1.TableService,
            get_table_name_by_id_service_1.GetTableNameByIdService,
            { provide: table_repository_1.TableRepository, useClass: table_repository_impl_1.TableRepositoryImpl },
        ],
        exports: [
            get_table_name_by_id_service_1.GetTableNameByIdService,
        ],
    })
], TableModule);
//# sourceMappingURL=table.module.js.map