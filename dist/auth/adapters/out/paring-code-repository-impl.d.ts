import { ParingCodeRepository } from 'src/auth/ports/out/paring-code-repository';
export declare class ParingCodeRepositoryImpl implements ParingCodeRepository {
    private paringCodes;
    constructor();
    saveParingCode(tableId: string, code: string, expiresIn?: number): Promise<void>;
    findByParingCode(code: string): Promise<{
        tableId: string;
        expiresAt: Date;
    } | null>;
    deleteParingCode(code: string): Promise<void>;
    private clearExpiredParingCodes;
}
