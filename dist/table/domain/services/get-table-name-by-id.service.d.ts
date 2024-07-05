import { TableRepository } from 'src/table/ports/out/table-repository';
export declare class GetTableNameByIdService {
    private readonly tableRepository;
    constructor(tableRepository: TableRepository);
    execute(id: string): Promise<string>;
}
