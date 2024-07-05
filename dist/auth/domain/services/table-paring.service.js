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
exports.TableParingService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const paring_code_repository_1 = require("../../ports/out/paring-code-repository");
const get_table_name_by_id_service_1 = require("../../../table/domain/services/get-table-name-by-id.service");
const admin_permission_denied_error_1 = require("../errors/admin-permission-denied-error");
const invalid_paring_code_error_1 = require("../errors/invalid-paring-code-error");
const admin_permission_1 = require("../models/admin-permission");
const table_1 = require("../models/table");
const token_service_1 = require("./token.service");
let TableParingService = class TableParingService {
    paringCodeRepository;
    getTableNameByIdService;
    tokenService;
    constructor(paringCodeRepository, getTableNameByIdService, tokenService) {
        this.paringCodeRepository = paringCodeRepository;
        this.getTableNameByIdService = getTableNameByIdService;
        this.tokenService = tokenService;
    }
    async generateParingCode(adminAuthority, tableId) {
        if (!adminAuthority.hasPermission(admin_permission_1.AdminPermission.PARING_TABLE)) {
            throw new admin_permission_denied_error_1.AdminPermissionDeniedError();
        }
        return this.recursiveGenerateParingCode(tableId);
    }
    async paring(paringCode) {
        const result = await this.paringCodeRepository.findByParingCode(paringCode);
        if (!result) {
            throw new invalid_paring_code_error_1.InvalidParingCodeError();
        }
        if (result.expiresAt && result.expiresAt < new Date()) {
            throw new invalid_paring_code_error_1.InvalidParingCodeError();
        }
        await this.paringCodeRepository.deleteParingCode(paringCode);
        const tableName = await this.getTableNameByIdService.execute(result.tableId);
        const table = new table_1.Table(result.tableId, tableName);
        return this.tokenService.issueTableAccessToken(table);
    }
    async recursiveGenerateParingCode(tableId, retries = 5) {
        try {
            const nanoid = (0, nanoid_1.customAlphabet)('1234567890', 6);
            const paringCode = nanoid();
            await this.paringCodeRepository.saveParingCode(tableId, paringCode, 5 * 60 * 1000);
            return paringCode;
        }
        catch (e) {
            if (retries <= 0) {
                throw e;
            }
            return this.recursiveGenerateParingCode(tableId, retries - 1);
        }
    }
};
exports.TableParingService = TableParingService;
exports.TableParingService = TableParingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(paring_code_repository_1.ParingCodeRepository)),
    __metadata("design:paramtypes", [Object, get_table_name_by_id_service_1.GetTableNameByIdService,
        token_service_1.TokenService])
], TableParingService);
//# sourceMappingURL=table-paring.service.js.map