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
exports.AdminRenewTokenService = void 0;
const common_1 = require("@nestjs/common");
const admin_authority_repository_1 = require("../../ports/out/admin-authority-repository");
const admin_refresh_token_repository_1 = require("../../ports/out/admin-refresh-token-repository");
const admin_authority_1 = require("../models/admin-authority");
const admin_refresh_token_info_1 = require("../models/admin-refresh-token-info");
const token_service_1 = require("./token.service");
const invalid_refresh_token_error_1 = require("../errors/invalid-refresh-token-error");
let AdminRenewTokenService = class AdminRenewTokenService {
    adminAuthorityRepository;
    adminRefreshTokenRepository;
    tokenService;
    constructor(adminAuthorityRepository, adminRefreshTokenRepository, tokenService) {
        this.adminAuthorityRepository = adminAuthorityRepository;
        this.adminRefreshTokenRepository = adminRefreshTokenRepository;
        this.tokenService = tokenService;
    }
    async execute(currentRefreshToken) {
        const isValid = this.tokenService.checkAdminRefreshToken(currentRefreshToken);
        if (!isValid) {
            throw new invalid_refresh_token_error_1.InvalidRefreshTokenError();
        }
        const { adminId, exp } = this.tokenService.decodeAdminRefreshToken(currentRefreshToken);
        const currentRefreshTokenInfo = new admin_refresh_token_info_1.AdminRefreshTokenInfo(adminId, currentRefreshToken, new Date(exp * 1000));
        const isExists = await this.adminRefreshTokenRepository.isExists(currentRefreshTokenInfo.adminId, currentRefreshToken);
        if (!isExists) {
            throw new invalid_refresh_token_error_1.InvalidRefreshTokenError();
        }
        const adminAuthority = (await this.adminAuthorityRepository.findByAdminId(currentRefreshTokenInfo.adminId))
            ?? new admin_authority_1.AdminAuthority(currentRefreshTokenInfo.adminId, []);
        const accessToken = this.tokenService.issueAdminAccessToken(adminAuthority);
        const newRefreshTokenInfo = this.tokenService.issueAdminRefreshToken(adminAuthority);
        await this.adminRefreshTokenRepository.deleteByRefreshToken(currentRefreshTokenInfo.adminId, currentRefreshToken);
        await this.adminRefreshTokenRepository.save(newRefreshTokenInfo);
        return {
            accessToken,
            refreshToken: newRefreshTokenInfo.refreshToken,
        };
    }
};
exports.AdminRenewTokenService = AdminRenewTokenService;
exports.AdminRenewTokenService = AdminRenewTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(admin_authority_repository_1.AdminAuthorityRepository)),
    __param(1, (0, common_1.Inject)(admin_refresh_token_repository_1.AdminRefreshTokenRepository)),
    __metadata("design:paramtypes", [Object, Object, token_service_1.TokenService])
], AdminRenewTokenService);
//# sourceMappingURL=admin-renew-token.service.js.map