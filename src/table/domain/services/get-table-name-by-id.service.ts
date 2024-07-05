import { Inject, Injectable } from '@nestjs/common';
import { TableRepository } from 'src/table/ports/out/table-repository';
import { TableNotFoundError } from '../errors/table-not-found-error';

@Injectable()
export class GetTableNameByIdService {
  constructor(
    @Inject(TableRepository) private readonly tableRepository: TableRepository,
  ) {}

  /**
   * @throws {TableNotFoundError}
   */
  async execute(id: string): Promise<string> {
    const table = await this.tableRepository.findById(id);

    if(!table) {
      throw new TableNotFoundError(id);
    }

    return table.name;
  }
}