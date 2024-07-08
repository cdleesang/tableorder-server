import { Injectable } from '@nestjs/common';
import { BasePosRepository } from 'src/common/modules/firebird/base-pos.repository';
import { FirebirdService } from 'src/common/modules/firebird/firebird.service';
import { Menu } from 'src/order/domain/models/menu';
import { OrderHistory } from 'src/order/domain/models/order-history';
import { TableOrderHistoryRepository } from 'src/order/ports/out/order-history-repository';
import { HTableEntity } from './h-table-entity';
import { transformOrderTime } from './utils/transform-order-time';

@Injectable()
export class TableOrderHistoryRepositoryImpl extends BasePosRepository<HTableEntity> implements TableOrderHistoryRepository {
  constructor(
    firebirdService: FirebirdService,
  ) {
    super('HTABLE', HTableEntity, firebirdService);
  }

  async findAll(): Promise<OrderHistory[]> {
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
    `) as Array<{
      STOCKCODE: string;
      STOCKNAME: string;
      DANGA: number;
      QTY: number;
      OTIME: string;
      POSNO: number;
      ISEQ: number;
      TNAME: string;
    }>;
  
    return rows
      .reduce((acc, row) => {
        const tableId = this.generateTableId(row.POSNO, row.ISEQ);
        const menu = new Menu(row.STOCKCODE!, row.STOCKNAME!, row.DANGA!, row.QTY!, transformOrderTime(row.OTIME!));
        const existingTable = acc.find(order => order.tableId === tableId)
          ?? new OrderHistory(tableId, row.TNAME, []);

        existingTable.addMenu(menu);

        return acc.filter(history => history.tableId !== tableId).concat(existingTable);
      }, [] as OrderHistory[])
      .sort((a, b) => b.tableId.localeCompare(a.tableId));
  }

  async findByTableId(tableId: string): Promise<OrderHistory | null> {
    return (await this.findAll()).find(order => order.tableId === tableId) || null;
  }

  async totalSalesRevenue(): Promise<number> {
    const rows = await this.rawQuery(`
      SELECT
        SUM(TOTALAMT) AS TOTALAMT
      FROM
        HSALETOTAL
    `) as Array<{TOTALAMT: number | null}>;

    return rows[0].TOTALAMT ?? 0;
  }

  private generateTableId(posNo: number, seq: number): string {
    return `${posNo}_${seq}`;
  }
}