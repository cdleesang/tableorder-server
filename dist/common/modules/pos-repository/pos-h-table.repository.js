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
var PosHTableRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosHTableRepository = void 0;
const common_1 = require("@nestjs/common");
const firebird_service_1 = require("../firebird/firebird.service");
const column_decorator_1 = require("../firebird/decorators/column.decorator");
const transform_decorator_1 = require("../firebird/decorators/transform.decorator");
const base_pos_repository_1 = require("../firebird/base-pos.repository");
class HTableEntity {
    seq;
    tableNo;
    posNo;
    stockCode;
    stockName;
    amount;
    quantity;
    totalAmount;
    CHECKIN;
    KITPRN;
    CANGB;
    SVCGB;
    DCGB;
    DCAMT;
    CHASU;
    SMAN;
    orderTime;
    ORDNO;
    VATGB;
    VAT;
    UNIT;
    DLCARDNO;
}
__decorate([
    (0, column_decorator_1.Column)('ISEQ'),
    __metadata("design:type", Number)
], HTableEntity.prototype, "seq", void 0);
__decorate([
    (0, column_decorator_1.Column)('TABLENO'),
    __metadata("design:type", Number)
], HTableEntity.prototype, "tableNo", void 0);
__decorate([
    (0, column_decorator_1.Column)('POSNO'),
    __metadata("design:type", Number)
], HTableEntity.prototype, "posNo", void 0);
__decorate([
    (0, column_decorator_1.Column)('STOCKCODE'),
    __metadata("design:type", String)
], HTableEntity.prototype, "stockCode", void 0);
__decorate([
    (0, column_decorator_1.Column)('STOCKNAME'),
    __metadata("design:type", String)
], HTableEntity.prototype, "stockName", void 0);
__decorate([
    (0, column_decorator_1.Column)('DANGA'),
    __metadata("design:type", Number)
], HTableEntity.prototype, "amount", void 0);
__decorate([
    (0, column_decorator_1.Column)('QTY'),
    __metadata("design:type", Number)
], HTableEntity.prototype, "quantity", void 0);
__decorate([
    (0, column_decorator_1.Column)('AMOUNT'),
    __metadata("design:type", Number)
], HTableEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, column_decorator_1.Column)('CHECKIN'),
    __metadata("design:type", String)
], HTableEntity.prototype, "CHECKIN", void 0);
__decorate([
    (0, column_decorator_1.Column)('KITPRN'),
    __metadata("design:type", String)
], HTableEntity.prototype, "KITPRN", void 0);
__decorate([
    (0, column_decorator_1.Column)('CANGB'),
    __metadata("design:type", Object)
], HTableEntity.prototype, "CANGB", void 0);
__decorate([
    (0, column_decorator_1.Column)('SVCGB'),
    __metadata("design:type", String)
], HTableEntity.prototype, "SVCGB", void 0);
__decorate([
    (0, column_decorator_1.Column)('DCGB'),
    __metadata("design:type", String)
], HTableEntity.prototype, "DCGB", void 0);
__decorate([
    (0, column_decorator_1.Column)('DCAMT'),
    __metadata("design:type", Number)
], HTableEntity.prototype, "DCAMT", void 0);
__decorate([
    (0, column_decorator_1.Column)('CHASU'),
    __metadata("design:type", Number)
], HTableEntity.prototype, "CHASU", void 0);
__decorate([
    (0, column_decorator_1.Column)('SMAN'),
    __metadata("design:type", String)
], HTableEntity.prototype, "SMAN", void 0);
__decorate([
    (0, column_decorator_1.Column)('OTIME'),
    (0, transform_decorator_1.Transform)(OTIME => {
        return new Date(parseInt(OTIME.slice(0, 4), 10), parseInt(OTIME.slice(4, 6), 10) - 1, parseInt(OTIME.slice(6, 8), 10), parseInt(OTIME.slice(8, 10), 10), parseInt(OTIME.slice(10, 12), 10), parseInt(OTIME.slice(12, 14), 10));
    }),
    __metadata("design:type", Date)
], HTableEntity.prototype, "orderTime", void 0);
let PosHTableRepository = class PosHTableRepository extends base_pos_repository_1.BasePosRepository {
    static { PosHTableRepository_1 = this; }
    static tableName = 'HTABLE';
    constructor(firebirdService) {
        super(PosHTableRepository_1.tableName, HTableEntity, firebirdService);
    }
};
exports.PosHTableRepository = PosHTableRepository;
exports.PosHTableRepository = PosHTableRepository = PosHTableRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebird_service_1.FirebirdService])
], PosHTableRepository);
//# sourceMappingURL=pos-h-table.repository.js.map