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
exports.AdminAuthorityRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const admin_authority_1 = require("../../domain/models/admin-authority");
const prisma_service_1 = require("../../../common/modules/prisma/prisma.service");
let AdminAuthorityRepositoryImpl = class AdminAuthorityRepositoryImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByAdminId(adminId) {
        const adminPermissions = await this.prisma.adminPermission.findMany({
            where: {
                adminId,
            },
        });
        return new admin_authority_1.AdminAuthority(adminId, adminPermissions.map(p => p.permission));
    }
    async save(authority) {
        await this.prisma.$transaction([
            this.prisma.adminPermission.deleteMany({
                where: {
                    adminId: authority.adminId,
                },
            }),
            this.prisma.adminPermission.createMany({
                data: authority.permissions.map(p => ({
                    adminId: authority.adminId,
                    permission: p,
                })),
            }),
        ]);
    }
};
exports.AdminAuthorityRepositoryImpl = AdminAuthorityRepositoryImpl;
exports.AdminAuthorityRepositoryImpl = AdminAuthorityRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminAuthorityRepositoryImpl);
//# sourceMappingURL=admin-authority-repository-impl.js.map