import { BasePosRepository } from 'src/common/modules/firebird/base-pos.repository';
import { FirebirdService } from 'src/common/modules/firebird/firebird.service';
import { OrderHistory } from 'src/order/domain/models/order-history';
import { TableOrderHistoryRepository } from 'src/order/ports/out/order-history-repository';
import { HTableEntity } from './h-table-entity';
export declare class TableOrderHistoryRepositoryImpl extends BasePosRepository<HTableEntity> implements TableOrderHistoryRepository {
    constructor(firebirdService: FirebirdService);
    findAll(): Promise<OrderHistory[]>;
    findByTableId(tableId: string): Promise<OrderHistory | null>;
    totalSalesRevenue(): Promise<number>;
    private generateTableId;
}
