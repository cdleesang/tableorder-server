import { Table } from 'src/table/domain/models/table';
export interface TableRepository {
    findAll(): Promise<Table[]>;
    findById(id: string): Promise<Table | null>;
}
export declare const TableRepository: unique symbol;
