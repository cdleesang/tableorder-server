import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { CallStaffService } from './call-staff.service';
import { CallStaffBody } from './types/call-staff-request.type';
import { GetCallStaffOptionsResponse } from './types/call-staff-response.type';

@Controller('call-staff')
export class CallStaffController {
  constructor(private readonly callStaffService: CallStaffService) {}

  /**
   * 직원 호출 옵션 조회.
   * 
   * @tag 직원호출
   */
  @TypedRoute.Get('option')
  getCallStaffOptions(): Promise<GetCallStaffOptionsResponse> {
    return this.callStaffService.getCallOptions();
  }

  /**
   * 직원 호출.
   * 
   * @tag 직원호출
   */
  @TypedRoute.Post()
  callStaff(@TypedBody() body: CallStaffBody): Promise<true> {
    return this.callStaffService.callStaff(body.tableId, body.options);
  }
}