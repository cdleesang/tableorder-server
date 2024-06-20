import { HttpService } from '@nestjs/axios';
import { EasycallSetupListResponse } from '../types/selvers-easycall-response.type';
import { EasycallOptionId, StoreId, TableId } from '../types/selvers-client.type';
export declare class SelversEasycallClient {
    private readonly httpService;
    constructor(httpService: HttpService);
    private genFullPath;
    getCallStaffOptions(storeId: StoreId): Promise<EasycallSetupListResponse>;
    callStaff(storeId: StoreId, tableId: TableId, options: {
        id: EasycallOptionId;
        title: string;
        count: number;
    }[]): Promise<true>;
}
