"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_module_1 = require("../admin/admin.module");
const config_module_1 = require("../config/config.module");
const table_module_1 = require("../table/table.module");
const auth_controller_1 = require("./adapters/in/web/auth.controller");
const admin_authority_repository_impl_1 = require("./adapters/out/admin-authority-repository-impl");
const paring_code_repository_impl_1 = require("./adapters/out/paring-code-repository-impl");
const services_1 = require("./domain/services");
const table_paring_service_1 = require("./domain/services/table-paring.service");
const admin_authority_repository_1 = require("./ports/out/admin-authority-repository");
const paring_code_repository_1 = require("./ports/out/paring-code-repository");
const admin_guard_1 = require("./utils/guards/admin.guard");
const admin_refresh_token_repository_1 = require("./ports/out/admin-refresh-token-repository");
const admin_refresh_token_repository_impl_1 = require("./adapters/out/admin-refresh-token-repository-impl");
const admin_sign_out_service_1 = require("./domain/services/admin-sign-out.service");
const admin_sign_out_all_service_1 = require("./domain/services/admin-sign-out-all.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            config_module_1.ConfigModule,
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => table_module_1.TableModule),
        ],
        controllers: [
            auth_controller_1.AuthController,
        ],
        providers: [
            admin_guard_1.AdminGuard,
            services_1.TokenService,
            services_1.AdminRenewTokenService,
            services_1.AdminSignInService,
            admin_sign_out_service_1.AdminSignOutService,
            admin_sign_out_all_service_1.AdminSignOutAllService,
            services_1.CanAdminAccessService,
            services_1.ViewAdminPermissionsService,
            services_1.UpdateAdminPermissionsService,
            table_paring_service_1.TableParingService,
            { provide: admin_authority_repository_1.AdminAuthorityRepository, useClass: admin_authority_repository_impl_1.AdminAuthorityRepositoryImpl },
            { provide: admin_refresh_token_repository_1.AdminRefreshTokenRepository, useClass: admin_refresh_token_repository_impl_1.AdminRefreshTokenRepositoryImpl },
            { provide: paring_code_repository_1.ParingCodeRepository, useClass: paring_code_repository_impl_1.ParingCodeRepositoryImpl },
        ],
        exports: [
            admin_guard_1.AdminGuard,
            services_1.TokenService,
            services_1.CanAdminAccessService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map