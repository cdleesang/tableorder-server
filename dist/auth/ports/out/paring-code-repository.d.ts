export interface ParingCodeRepository {
    saveParingCode(tableId: string, code: string, expiresIn?: number): Promise<void>;
    findByParingCode(code: string): Promise<{
        tableId: string;
        expiresAt?: Date;
    } | null>;
    deleteParingCode(code: string): Promise<void>;
}
export declare const ParingCodeRepository: unique symbol;
