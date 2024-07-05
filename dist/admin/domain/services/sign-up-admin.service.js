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
exports.SignUpAdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("../../ports/out/admin-repository");
const admin_already_exists_error_1 = require("../errors/admin-already-exists-error");
const admin_1 = require("../models/admin");
let SignUpAdminService = class SignUpAdminService {
    adminRepository;
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute(signInId, password, name) {
        const id = admin_1.Admin.generateId();
        const existingAdmin = await this.adminRepository.findBySignInId(signInId);
        if (existingAdmin) {
            throw new admin_already_exists_error_1.AdminAlreadyExistsError();
        }
        const admin = new admin_1.Admin(id, signInId, '', name);
        admin.setPassword(password);
        await this.adminRepository.save(admin);
    }
};
exports.SignUpAdminService = SignUpAdminService;
exports.SignUpAdminService = SignUpAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(admin_repository_1.AdminRepository)),
    __metadata("design:paramtypes", [Object])
], SignUpAdminService);
//# sourceMappingURL=sign-up-admin.service.js.map