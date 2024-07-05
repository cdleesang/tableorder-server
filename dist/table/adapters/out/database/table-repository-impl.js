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
exports.TableRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const base_pos_repository_1 = require("../../../../common/modules/firebird/base-pos.repository");
const firebird_service_1 = require("../../../../common/modules/firebird/firebird.service");
const table_1 = require("../../../domain/models/table");
const table_nm_entity_1 = require("./table-nm-entity");
let TableRepositoryImpl = class TableRepositoryImpl extends base_pos_repository_1.BasePosRepository {
    constructor(firebirdService) {
        super('HTABLE_NM', table_nm_entity_1.TableNMEntity, firebirdService);
    }
    async findAll() {
        const tableNMs = (await this.findMany({
            select: {
                posNo: true,
                seq: true,
                name: true,
            },
            where: {
                width: { type: 'ne', value: null },
                height: { type: 'ne', value: null },
            },
            orderBy: [
                { column: 'posNo', order: 'asc' },
                { column: 'seq', order: 'asc' },
            ],
        }));
        return tableNMs.map(tableNM => new table_1.Table(this.generateTableId(tableNM), tableNM.name));
    }
    async findById(id) {
        const [posNo, seq] = id.split('_').map(Number);
        const tableNM = await this.findFirst({
            select: {
                name: true,
            },
            where: {
                posNo: { type: 'eq', value: posNo },
                seq: { type: 'eq', value: seq },
            },
        });
        if (!tableNM) {
            return null;
        }
        return new table_1.Table(id, tableNM.name);
    }
    generateTableId(tableNM) {
        return `${tableNM.posNo}_${tableNM.seq}`;
    }
};
exports.TableRepositoryImpl = TableRepositoryImpl;
exports.TableRepositoryImpl = TableRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebird_service_1.FirebirdService])
], TableRepositoryImpl);
//# sourceMappingURL=table-repository-impl.js.map