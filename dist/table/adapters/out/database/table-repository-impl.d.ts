import { BasePosRepository } from 'src/common/modules/firebird/base-pos.repository';
import { FirebirdService } from 'src/common/modules/firebird/firebird.service';
import { Table } from 'src/table/domain/models/table';
import { TableRepository } from 'src/table/ports/out/table-repository';
import { TableNMEntity } from './table-nm-entity';
export declare class TableRepositoryImpl extends BasePosRepository<TableNMEntity> implements TableRepository {
    constructor(firebirdService: FirebirdService);
    findAll(): Promise<Table[]>;
    findById(id: string): Promise<Table | null>;
    private generateTableId;
}
