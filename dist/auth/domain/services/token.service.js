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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_service_1 = require("../../../config/config.service");
const admin_authority_1 = require("../models/admin-authority");
const admin_refresh_token_info_1 = require("../models/admin-refresh-token-info");
let TokenService = class TokenService {
    jwtService;
    configService;
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async issueTableAccessToken(table) {
        const payload = {
            tableId: table.id,
            tableName: table.name,
        };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('TABLE_JWT_SECRET'),
            audience: 'table',
        });
    }
    checkTableAccessToken(token) {
        try {
            this.jwtService.verify(token, {
                secret: this.configService.get('TABLE_JWT_SECRET'),
                audience: 'table',
            });
            return true;
        }
        catch {
            return false;
        }
    }
    decodeTableAccessToken(token) {
        return this.jwtService.decode(token);
    }
    issueAdminAccessToken(authority) {
        const payload = {
            adminId: authority.adminId,
            permissions: authority.permissions,
        };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('ADMIN_JWT_SECRET'),
            audience: 'admin_access',
            expiresIn: '5m',
        });
    }
    checkAdminAccessToken(token) {
        try {
            this.jwtService.verify(token, {
                secret: this.configService.get('ADMIN_JWT_SECRET'),
                audience: 'admin_access',
            });
            return true;
        }
        catch {
            return false;
        }
    }
    decodeAdminAccessToken(token) {
        const payload = this.jwtService.decode(token);
        return new admin_authority_1.AdminAuthority(payload.adminId, payload.permissions);
    }
    issueAdminRefreshToken(authority) {
        const payload = {
            adminId: authority.adminId,
        };
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('ADMIN_REFRESH_JWT_SECRET'),
            audience: 'admin_refresh',
            expiresIn: '30d',
        });
        const { exp } = this.decodeAdminRefreshToken(refreshToken);
        return new admin_refresh_token_info_1.AdminRefreshTokenInfo(authority.adminId, refreshToken, new Date(exp * 1000));
    }
    checkAdminRefreshToken(token) {
        try {
            this.jwtService.verify(token, {
                secret: this.configService.get('ADMIN_REFRESH_JWT_SECRET'),
                audience: 'admin_refresh',
            });
            return true;
        }
        catch {
            return false;
        }
    }
    decodeAdminRefreshToken(token) {
        return this.jwtService.decode(token);
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_service_1.ConfigService])
], TokenService);
//# sourceMappingURL=token.service.js.map