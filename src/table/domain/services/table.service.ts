import { Inject, Injectable } from '@nestjs/common';
import { TableRepository } from 'src/table/ports/out/table-repository';

@Injectable()
export class TableService {
  constructor(
    @Inject(TableRepository) private readonly tableRepository: TableRepository,
  ) {}

  viewAllTables(): Promise<{id: string, name: string}[]> {
    return this.tableRepository.findAll();
  }
}