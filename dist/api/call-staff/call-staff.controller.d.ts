import { CallStaffService } from './call-staff.service';
import { CallStaffBody } from './types/call-staff-request.type';
import { GetCallStaffOptionsResponse } from './types/call-staff-response.type';
export declare class CallStaffController {
    private readonly callStaffService;
    constructor(callStaffService: CallStaffService);
    getCallStaffOptions(): Promise<GetCallStaffOptionsResponse>;
    callStaff(tableId: number, body: CallStaffBody): Promise<true>;
}
