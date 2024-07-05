import { ConfigService } from '../../config/config.service';
import { GetCallStaffOptionsResponse } from './types/call-staff-response.type';
import { LegacyPrismaService } from '../../common/modules/prisma/legacy-prisma.service';
import { SelversClientService } from '../../common/modules/selvers-client/selvers-client.service';
export declare class CallStaffService {
    private readonly configService;
    private readonly prismaService;
    private readonly selversClientService;
    constructor(configService: ConfigService, prismaService: LegacyPrismaService, selversClientService: SelversClientService);
    getCallOptions(): Promise<GetCallStaffOptionsResponse>;
    callStaff(tableId: number, options: {
        id: number;
        title: string;
        quantity: number;
    }[]): Promise<true>;
}
