"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_permission_1 = require("../../../auth/domain/models/admin-permission");
const can_admin_access_service_1 = require("../../../auth/domain/services/can-admin-access.service");
const admin_repository_1 = require("../../ports/out/admin-repository");
const admin_permission_denied_error_1 = require("../../../auth/domain/errors/admin-permission-denied-error");
let DeleteAdminService = class DeleteAdminService {
    adminRepository;
    canAdminAccessService;
    constructor(adminRepository, canAdminAccessService) {
        this.adminRepository = adminRepository;
        this.canAdminAccessService = canAdminAccessService;
    }
    async execute(authority, targetId) {
        const isAccessible = await this.canAdminAccessService.execute(authority, admin_permission_1.AdminPermission.DELETE_ADMIN);
        if (!(authority.adminId === targetId || isAccessible)) {
            throw new admin_permission_denied_error_1.AdminPermissionDeniedError();
        }
        await this.adminRepository.deleteById(targetId);
    }
};
exports.DeleteAdminService = DeleteAdminService;
exports.DeleteAdminService = DeleteAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(admin_repository_1.AdminRepository)),
    __metadata("design:paramtypes", [Object, can_admin_access_service_1.CanAdminAccessService])
], DeleteAdminService);
//# sourceMappingURL=delete-admin.service.js.map