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
exports.UpdateAdminPermissionsService = void 0;
const common_1 = require("@nestjs/common");
const admin_permission_denied_error_1 = require("../errors/admin-permission-denied-error");
const admin_authority_repository_1 = require("../../ports/out/admin-authority-repository");
const admin_authority_1 = require("../models/admin-authority");
const admin_permission_1 = require("../models/admin-permission");
const self_permission_change_not_allowed_error_1 = require("../errors/self-permission-change-not-allowed-error");
let UpdateAdminPermissionsService = class UpdateAdminPermissionsService {
    adminAuthorityRepository;
    constructor(adminAuthorityRepository) {
        this.adminAuthorityRepository = adminAuthorityRepository;
    }
    async execute(authority, targetId, newPermissions) {
        if (!authority.hasPermission(admin_permission_1.AdminPermission.MANAGE_ADMIN_PERMISSION)) {
            throw new admin_permission_denied_error_1.AdminPermissionDeniedError();
        }
        if (authority.adminId === targetId) {
            throw new self_permission_change_not_allowed_error_1.SelfPermissionChangeNotAllowedError();
        }
        let target = await this.adminAuthorityRepository.findByAdminId(targetId);
        if (!target) {
            target = new admin_authority_1.AdminAuthority(targetId, []);
        }
        target.clearPermissions();
        newPermissions.forEach(p => target.addPermission(p));
        await this.adminAuthorityRepository.save(target);
    }
};
exports.UpdateAdminPermissionsService = UpdateAdminPermissionsService;
exports.UpdateAdminPermissionsService = UpdateAdminPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(admin_authority_repository_1.AdminAuthorityRepository)),
    __metadata("design:paramtypes", [Object])
], UpdateAdminPermissionsService);
//# sourceMappingURL=update-admin-permissions.service.js.map