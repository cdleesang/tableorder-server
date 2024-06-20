import { ConfigService } from '../../config/config.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { SelversClientService } from '../../providers/selvers-client/selvers-client.service';
import { GetCallStaffOptionsResponse } from './types/call-staff-response.type';
export declare class CallStaffService {
    private readonly configService;
    private readonly prismaService;
    private readonly selversClientService;
    constructor(configService: ConfigService, prismaService: PrismaService, selversClientService: SelversClientService);
    getCallOptions(): Promise<GetCallStaffOptionsResponse>;
    callStaff(tableId: number, options: {
        id: number;
        title: string;
        quantity: number;
    }[]): Promise<true>;
}
