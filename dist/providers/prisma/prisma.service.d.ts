import { OnModuleInit } from '@nestjs/common';
import { SelversClientService } from '../selvers-client/selvers-client.service';
import { ExtendedPrismaClient } from './utils/extended-client';
export declare class PrismaService extends ExtendedPrismaClient implements OnModuleInit {
    private readonly selversClientService;
    constructor(selversClientService: SelversClientService);
    getMemberIdByTableId(tableId: number): Promise<string>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
