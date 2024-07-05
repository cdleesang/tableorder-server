import { TableRepository } from 'src/table/ports/out/table-repository';
export declare class TableService {
    private readonly tableRepository;
    constructor(tableRepository: TableRepository);
    viewAllTables(): Promise<{
        id: string;
        name: string;
    }[]>;
}
