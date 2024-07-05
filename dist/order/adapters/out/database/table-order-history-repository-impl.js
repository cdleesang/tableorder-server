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
exports.TableOrderHistoryRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const base_pos_repository_1 = require("../../../../common/modules/firebird/base-pos.repository");
const firebird_service_1 = require("../../../../common/modules/firebird/firebird.service");
const menu_1 = require("../../../domain/models/menu");
const order_history_1 = require("../../../domain/models/order-history");
const h_table_entity_1 = require("./h-table-entity");
const transform_order_time_1 = require("./utils/transform-order-time");
let TableOrderHistoryRepositoryImpl = class TableOrderHistoryRepositoryImpl extends base_pos_repository_1.BasePosRepository {
    constructor(firebirdService) {
        super('HTABLE', h_table_entity_1.HTableEntity, firebirdService);
    }
    async findAll() {
        const rows = await this.rawQuery(`
      SELECT
        t.STOCKCODE,
        t.STOCKNAME,
        t.DANGA,
        t.QTY,
        t.OTIME,
        tnm.POSNO,
        tnm.ISEQ,
        tnm.TNAME
      FROM
        HTABLE t
      JOIN
        HTABLE_NM tnm ON t.TABLENO = tnm.ISEQ
                        AND t.POSNO = tnm.POSNO
      ORDER BY
        t.OTIME asc
    `);
        return rows
            .reduce((acc, row) => {
            const tableId = this.generateTableId(row.POSNO, row.ISEQ);
            const menu = new menu_1.Menu(row.STOCKCODE, row.STOCKNAME, row.DANGA, row.QTY, (0, transform_order_time_1.transformOrderTime)(row.OTIME));
            const existingTable = acc.find(order => order.tableId === tableId)
                ?? new order_history_1.OrderHistory(tableId, row.TNAME, []);
            existingTable.addMenu(menu);
            return acc.filter(history => history.tableId !== tableId).concat(existingTable);
        }, [])
            .sort((a, b) => b.tableId.localeCompare(a.tableId));
    }
    async findByTableId(tableId) {
        return (await this.findAll()).find(order => order.tableId === tableId) || null;
    }
    generateTableId(posNo, seq) {
        return `${posNo}_${seq}`;
    }
};
exports.TableOrderHistoryRepositoryImpl = TableOrderHistoryRepositoryImpl;
exports.TableOrderHistoryRepositoryImpl = TableOrderHistoryRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebird_service_1.FirebirdService])
], TableOrderHistoryRepositoryImpl);
//# sourceMappingURL=table-order-history-repository-impl.js.map