import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
export declare class FirebirdService implements OnModuleInit, OnModuleDestroy {
    private readonly configService;
    private db;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    findFirst(table: string, options: {
        select?: Record<string, true>;
        where?: Record<string, any>;
        orderBy?: Record<string, 'asc' | 'desc'>;
    }): Promise<Record<string, any> | undefined>;
    findMany(table: string, options: {
        select?: Record<string, true>;
        where?: Record<string, any>;
        offset?: number;
        limit?: number;
        orderBy?: Record<string, 'asc' | 'desc'>;
    }): Promise<Record<string, any>[]>;
    onModuleDestroy(): Promise<void>;
}
