import { TableService } from 'src/table/domain/services/table.service';
import { ViewAllTablesResponseDto } from './dto/view-all-tables.dto';
export declare class TableController {
    private readonly tableService;
    constructor(tableService: TableService);
    viewAllTables(): Promise<ViewAllTablesResponseDto>;
}
