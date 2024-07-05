import { FirebirdService } from './firebird.service';
export declare abstract class BasePosRepository<T extends Record<string, any>> {
    private readonly tableName;
    private readonly entity;
    private readonly firebirdService;
    constructor(tableName: string, entity: (new () => T), firebirdService: FirebirdService);
    findFirst<S extends keyof T>(options: {
        select?: Record<S, true>;
        where?: Partial<{
            [K in keyof T]: {
                type: 'eq' | 'ne' | 'gte' | 'gt' | 'lt' | 'lte';
                value: T[K] | null;
            };
        }>;
        orderBy?: Record<keyof T, 'asc' | 'desc'>;
    }): Promise<{
        [key in S]: T[key];
    } | undefined>;
    findMany<S extends keyof T>(options: {
        select?: Partial<Record<S, true>>;
        where?: Partial<{
            [K in keyof T]: {
                type: 'eq' | 'ne' | 'gte' | 'gt' | 'lt' | 'lte';
                value: T[K] | null;
            };
        }>;
        orderBy?: {
            column: keyof T;
            order: 'asc' | 'desc';
        }[];
        offset?: number;
        limit?: number;
    }): Promise<{
        [key in S]: T[key];
    }[]>;
    rawQuery(query: string, params?: string[]): Promise<Record<string, any>[]>;
    private parseFindOptions;
    private parse;
}
