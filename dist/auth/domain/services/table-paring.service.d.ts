import { ParingCodeRepository } from 'src/auth/ports/out/paring-code-repository';
import { GetTableNameByIdService } from 'src/table/domain/services/get-table-name-by-id.service';
import { AdminAuthority } from '../models/admin-authority';
import { TokenService } from './token.service';
export declare class TableParingService {
    private readonly paringCodeRepository;
    private getTableNameByIdService;
    private readonly tokenService;
    constructor(paringCodeRepository: ParingCodeRepository, getTableNameByIdService: GetTableNameByIdService, tokenService: TokenService);
    generateParingCode(adminAuthority: AdminAuthority, tableId: string): Promise<string>;
    paring(paringCode: string): Promise<string>;
    private recursiveGenerateParingCode;
}
