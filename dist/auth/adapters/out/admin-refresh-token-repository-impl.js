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
exports.AdminRefreshTokenRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../common/modules/prisma/prisma.service");
let AdminRefreshTokenRepositoryImpl = class AdminRefreshTokenRepositoryImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
        setInterval(() => this.clearExpiredRefreshTokens(), 5 * 1000);
    }
    async save(refreshTokenInfo) {
        await this.prisma.adminRefreshToken.upsert({
            where: {
                adminId_refreshToken: {
                    adminId: refreshTokenInfo.adminId,
                    refreshToken: refreshTokenInfo.refreshToken,
                },
            },
            update: {},
            create: {
                adminId: refreshTokenInfo.adminId,
                refreshToken: refreshTokenInfo.refreshToken,
                expiresAt: refreshTokenInfo.expiresAt,
            },
        });
    }
    async isExists(adminId, refreshToken) {
        const result = await this.prisma.adminRefreshToken.findUnique({
            where: {
                adminId_refreshToken: {
                    adminId,
                    refreshToken,
                },
            },
        });
        return !!result;
    }
    async deleteByRefreshToken(adminId, refreshToken) {
        try {
            await this.prisma.adminRefreshToken.delete({
                where: {
                    adminId_refreshToken: {
                        adminId,
                        refreshToken,
                    },
                },
            });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return;
                }
            }
            throw err;
        }
    }
    async deleteAll(adminId) {
        await this.prisma.adminRefreshToken.deleteMany({
            where: {
                adminId,
            },
        });
    }
    clearExpiredRefreshTokens() {
        this.prisma.adminRefreshToken.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        }).then(() => { });
    }
};
exports.AdminRefreshTokenRepositoryImpl = AdminRefreshTokenRepositoryImpl;
exports.AdminRefreshTokenRepositoryImpl = AdminRefreshTokenRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminRefreshTokenRepositoryImpl);
//# sourceMappingURL=admin-refresh-token-repository-impl.js.map