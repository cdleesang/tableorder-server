import { FirebirdService } from '../firebird/firebird.service';
export declare abstract class BasePosRepository<T extends Record<string, any>> {
    private readonly tableName;
    private readonly entity;
    private readonly firebirdService;
    constructor(tableName: string, entity: (new () => T), firebirdService: FirebirdService);
    findFirst<K extends keyof T>(options: {
        select?: Record<K, true>;
        where?: Partial<T>;
        orderBy?: Record<keyof T, 'asc' | 'desc'>;
    }): Promise<{
        [key in K]: T[key];
    } | undefined>;
    findMany<K extends keyof T>(options: {
        select?: Record<K, true>;
        where?: Partial<T>;
        orderBy?: Partial<Record<keyof T, 'asc' | 'desc'>>;
        offset?: number;
        limit?: number;
    }): Promise<{
        [key in K]: T[key];
    }[]>;
    private parseFindOptions;
    private parse;
}
