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
exports.AdminSignInService = void 0;
const common_1 = require("@nestjs/common");
const admin_refresh_token_repository_1 = require("../../ports/out/admin-refresh-token-repository");
const credential_verification_service_1 = require("../../../admin/domain/services/credential-verification.service");
const admin_authority_repository_1 = require("../../ports/out/admin-authority-repository");
const sign_in_failed_error_1 = require("../errors/sign-in-failed-error");
const admin_authority_1 = require("../models/admin-authority");
const token_service_1 = require("./token.service");
let AdminSignInService = class AdminSignInService {
    adminAuthorityRepository;
    adminRefreshTokenRepository;
    credentialVerificationService;
    tokenService;
    constructor(adminAuthorityRepository, adminRefreshTokenRepository, credentialVerificationService, tokenService) {
        this.adminAuthorityRepository = adminAuthorityRepository;
        this.adminRefreshTokenRepository = adminRefreshTokenRepository;
        this.credentialVerificationService = credentialVerificationService;
        this.tokenService = tokenService;
    }
    async execute(signInId, password) {
        const verified = await this.credentialVerificationService.execute(signInId, password);
        if (!verified) {
            throw new sign_in_failed_error_1.SignInFailedError();
        }
        let authority = await this.adminAuthorityRepository.findByAdminId(verified.id);
        if (!authority) {
            authority = new admin_authority_1.AdminAuthority(verified.id, []);
        }
        const accessToken = this.tokenService.issueAdminAccessToken(authority);
        const refreshTokenInfo = this.tokenService.issueAdminRefreshToken(authority);
        await this.adminRefreshTokenRepository.save(refreshTokenInfo);
        return {
            accessToken,
            refreshToken: refreshTokenInfo.refreshToken,
        };
    }
};
exports.AdminSignInService = AdminSignInService;
exports.AdminSignInService = AdminSignInService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(admin_authority_repository_1.AdminAuthorityRepository)),
    __param(1, (0, common_1.Inject)(admin_refresh_token_repository_1.AdminRefreshTokenRepository)),
    __metadata("design:paramtypes", [Object, Object, credential_verification_service_1.CredentialVerificationService,
        token_service_1.TokenService])
], AdminSignInService);
//# sourceMappingURL=admin-sign-in.service.js.map