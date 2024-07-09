import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import type { FireBirdOptions } from './types/fire-bird-options.type';
export declare class FirebirdService implements OnModuleInit, OnModuleDestroy {
    private readonly options;
    private pool;
    constructor(options: FireBirdOptions);
    onModuleInit(): Promise<void>;
    findFirst(table: string, options: {
        select?: Record<string, true>;
        where?: Record<string, {
            type: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte';
            value: string | number | null;
        }>;
        orderBy?: {
            column: string;
            order: 'asc' | 'desc';
        }[];
    }): Promise<Record<string, any> | undefined>;
    findMany(table: string, options: {
        select?: Record<string, true>;
        where?: Record<string, {
            type: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte';
            value: string | number | null;
        }>;
        offset?: number;
        limit?: number;
        orderBy?: {
            column: string;
            order: 'asc' | 'desc';
        }[];
    }): Promise<Record<string, any>[]>;
    rawQuery(query: string, params?: any[]): Promise<Record<string, any>[]>;
    onModuleDestroy(): Promise<void>;
    private getConnection;
    private timeout;
}
