import { OnModuleInit } from '@nestjs/common';
import { SelversClientService } from '../selvers-client/selvers-client.service';
import { LegacyExtendedPrismaClient } from './utils/legacy-extended-client';
export declare class LegacyPrismaService extends LegacyExtendedPrismaClient implements OnModuleInit {
    private readonly selversClientService;
    constructor(selversClientService: SelversClientService);
    getMemberIdByTableId(tableId: number): Promise<string>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
