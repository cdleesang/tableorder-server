"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const admin_controller_1 = require("./adapters/in/web/admin.controller");
const admin_repository_impl_1 = require("./adapters/out/admin-repository-impl");
const services_1 = require("./domain/services");
const admin_repository_1 = require("./ports/out/admin-repository");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [
            admin_controller_1.AdminController,
        ],
        providers: [
            services_1.DeleteAdminService,
            services_1.SignUpAdminService,
            services_1.SearchAdminsService,
            services_1.UpdateAdminOwnPasswordService,
            services_1.UpdateAdminOwnProfileService,
            services_1.ViewAdminOwnProfileService,
            services_1.CredentialVerificationService,
            { provide: admin_repository_1.AdminRepository, useClass: admin_repository_impl_1.AdminRepositoryImpl },
        ],
        exports: [
            services_1.CredentialVerificationService,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map