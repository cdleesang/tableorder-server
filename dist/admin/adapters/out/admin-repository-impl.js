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
exports.AdminRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../common/modules/prisma/prisma.service");
const admin_1 = require("../../domain/models/admin");
let AdminRepositoryImpl = class AdminRepositoryImpl {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async save(admin) {
        await this.prismaService.admin.upsert({
            where: { id: admin.id },
            create: {
                id: admin.id,
                signInId: admin.signInId,
                password: admin.hashedPassword,
                name: admin.name,
            },
            update: {
                password: admin.hashedPassword,
                name: admin.name,
            },
        });
    }
    async findAll(options) {
        const orderBy = options.order === 'oldest' ? [{ createdAt: 'asc' }] : [];
        const results = await this.prismaService.admin.findMany({
            skip: options.page ? (options.page - 1) * (options.limit ?? 0) : 0,
            take: options.limit,
            orderBy,
        });
        return results.map(this.mapToDomainModel);
    }
    async findBySignInId(signInId) {
        return this.findOne({ where: { signInId } });
    }
    async findById(id) {
        return this.findOne({ where: { id } });
    }
    async deleteById(id) {
        try {
            await this.prismaService.admin.delete({
                where: { id },
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
    async findOne(options) {
        const result = await this.prismaService.admin.findUnique(options);
        if (!result) {
            return null;
        }
        return this.mapToDomainModel(result);
    }
    mapToDomainModel(prismaAdmin) {
        return new admin_1.Admin(prismaAdmin.id, prismaAdmin.signInId, prismaAdmin.password, prismaAdmin.name, prismaAdmin.createdAt);
    }
};
exports.AdminRepositoryImpl = AdminRepositoryImpl;
exports.AdminRepositoryImpl = AdminRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminRepositoryImpl);
//# sourceMappingURL=admin-repository-impl.js.map