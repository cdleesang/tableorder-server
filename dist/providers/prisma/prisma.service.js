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
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const selvers_client_service_1 = require("../selvers-client/selvers-client.service");
const extended_client_1 = require("./utils/extended-client");
let PrismaService = class PrismaService extends extended_client_1.ExtendedPrismaClient {
    selversClientService;
    constructor(selversClientService) {
        super({
            log: ['error'],
            errorFormat: 'pretty',
        });
        this.selversClientService = selversClientService;
    }
    async getMemberIdByTableId(tableId) {
        const result = await this.table.findUnique({
            select: { memberId: true },
            where: { id: tableId },
        });
        return result.memberId;
    }
    async onModuleInit() {
        await this.$connect();
        const accounts = await this.table.findMany({
            select: {
                signInId: true,
                password: true,
            },
        });
        const settledResults = await Promise.allSettled(accounts.map(async (account) => {
            return this.selversClientService.auth.tableLogin(account.signInId, account.password);
        }));
        const loginInfos = settledResults
            .filter((result) => {
            if (result.status === 'rejected') {
                throw new Error('셀버스의 테이블 정보와 데이터베이스가 일치하지 않습니다.');
            }
            return true;
        })
            .map(result => result.value.member);
        await this.$transaction([
            ...loginInfos.map(loginInfo => this.table.update({
                where: { id: parseInt(loginInfo.StoreTable.seq, 10) },
                data: {
                    memberId: loginInfo.Member.id,
                    storeTableId: loginInfo.StoreTable.id,
                },
            })),
        ]);
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [selvers_client_service_1.SelversClientService])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map