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
exports.CallStaffService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../../config/config.service");
const entity_not_found_error_1 = require("../../common/modules/prisma/errors/entity-not-found.error");
const legacy_prisma_service_1 = require("../../common/modules/prisma/legacy-prisma.service");
const selvers_client_service_1 = require("../../common/modules/selvers-client/selvers-client.service");
let CallStaffService = class CallStaffService {
    configService;
    prismaService;
    selversClientService;
    constructor(configService, prismaService, selversClientService) {
        this.configService = configService;
        this.prismaService = prismaService;
        this.selversClientService = selversClientService;
    }
    async getCallOptions() {
        const storeId = this.configService.get('STORE_ID');
        const data = await this.selversClientService.easycall.getCallStaffOptions(storeId);
        return data.items.map(item => ({
            id: parseInt(item.EasyCallSetup.id, 10),
            title: item.EasyCallSetup.title,
            isCountable: item.EasyCallSetup.quantity_yn === 'Y',
        }));
    }
    async callStaff(tableId, options) {
        try {
            const result = await this.prismaService.table.findFirst({
                select: { storeTableId: true },
                where: { id: tableId },
            });
            const storeId = this.configService.get('STORE_ID');
            return this.selversClientService.easycall.callStaff(storeId, result.storeTableId, options.map(option => ({
                ...option,
                id: option.id.toString(),
                count: option.quantity,
            })));
        }
        catch (err) {
            if (err instanceof entity_not_found_error_1.EntityNotFoundErrors.Table) {
                throw new common_1.NotFoundException('일치하는 테이블 번호를 찾을 수 없습니다.');
            }
            throw new common_1.InternalServerErrorException('직원 호출에 실패했습니다.');
        }
    }
};
exports.CallStaffService = CallStaffService;
exports.CallStaffService = CallStaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        legacy_prisma_service_1.LegacyPrismaService,
        selvers_client_service_1.SelversClientService])
], CallStaffService);
//# sourceMappingURL=call-staff.service.js.map