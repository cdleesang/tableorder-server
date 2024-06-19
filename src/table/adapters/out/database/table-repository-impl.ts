import { Injectable } from '@nestjs/common';
import { BasePosRepository } from 'src/common/modules/firebird/base-pos.repository';
import { FirebirdService } from 'src/common/modules/firebird/firebird.service';
import { Table } from 'src/table/domain/models/table';
import { TableRepository } from 'src/table/ports/out/table-repository';
import { TableNMEntity } from './table-nm-entity';

@Injectable()
export class TableRepositoryImpl extends BasePosRepository<TableNMEntity> implements TableRepository {
  constructor(
    firebirdService: FirebirdService,
  ) {
    super('HTABLE_NM', TableNMEntity, firebirdService);
  }
  
  async findAll(): Promise<Table[]> {
    const tableNMs = (await this.findMany({
      select: {
        posNo: true,
        seq: true,
        name: true,
      },
      where: {
        width: {type: 'ne', value: null},
        height: {type: 'ne', value: null},
      },
      orderBy: [
        {column: 'posNo', order: 'asc'},
        {column: 'seq', order: 'asc'},
      ],
    }));

    return tableNMs.map(tableNM => new Table(this.generateTableId(tableNM), tableNM.name));
  }

  async findById(id: string): Promise<Table | null> {
    const [posNo, seq] = id.split('_').map(Number);
    const tableNM = await this.findFirst({
      select: {
        name: true,
      },
      where: {
        posNo: {type: 'eq', value: posNo},
        seq: {type: 'eq', value: seq},
      },
    });

    if(!tableNM) {
      return null;
    }

    return new Table(id, tableNM.name);
  }

  private generateTableId(tableNM: {posNo: number, seq: number}): string {
    return `${tableNM.posNo}_${tableNM.seq}`;
  }
}