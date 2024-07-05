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
exports.UpdateAdminOwnProfileService = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("../../ports/out/admin-repository");
const admin_not_found_error_1 = require("../errors/admin-not-found-error");
let UpdateAdminOwnProfileService = class UpdateAdminOwnProfileService {
    adminRepository;
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute(authority, profile) {
        const admin = await this.adminRepository.findById(authority.adminId);
        if (!admin) {
            throw new admin_not_found_error_1.AdminNotFoundError();
        }
        admin.name = profile.name;
        await this.adminRepository.save(admin);
    }
};
exports.UpdateAdminOwnProfileService = UpdateAdminOwnProfileService;
exports.UpdateAdminOwnProfileService = UpdateAdminOwnProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(admin_repository_1.AdminRepository)),
    __metadata("design:paramtypes", [Object])
], UpdateAdminOwnProfileService);
//# sourceMappingURL=update-admin-own-profile.service.js.map