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
exports.AdminSignOutService = void 0;
const common_1 = require("@nestjs/common");
const admin_refresh_token_repository_1 = require("../../ports/out/admin-refresh-token-repository");
const token_service_1 = require("./token.service");
const invalid_refresh_token_error_1 = require("../errors/invalid-refresh-token-error");
let AdminSignOutService = class AdminSignOutService {
    adminRefreshTokenRepository;
    tokenService;
    constructor(adminRefreshTokenRepository, tokenService) {
        this.adminRefreshTokenRepository = adminRefreshTokenRepository;
        this.tokenService = tokenService;
    }
    async execute(authority, refreshToken) {
        const isValid = this.tokenService.checkAdminRefreshToken(refreshToken);
        if (!isValid) {
            throw new invalid_refresh_token_error_1.InvalidRefreshTokenError();
        }
        await this.adminRefreshTokenRepository.deleteByRefreshToken(authority.adminId, refreshToken);
    }
};
exports.AdminSignOutService = AdminSignOutService;
exports.AdminSignOutService = AdminSignOutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(admin_refresh_token_repository_1.AdminRefreshTokenRepository)),
    __metadata("design:paramtypes", [Object, token_service_1.TokenService])
], AdminSignOutService);
//# sourceMappingURL=admin-sign-out.service.js.map