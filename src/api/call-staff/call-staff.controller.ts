import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { CallStaffService } from './call-staff.service';
import { CallStaffBody } from './types/call-staff.controller.interface';

@Controller('call-staff')
export class CallStaffController {
  constructor(private readonly callStaffService: CallStaffService) {}

  /**
   * 직원 호출 옵션 조회.
   * 
   * @tag 직원호출
   */
  @TypedRoute.Get('option')
  getCallStaffOptions() {
    return this.callStaffService.getCallOptions();
  }

  /**
   * 직원 호출.
   * 
   * @tag 직원호출
   */
  @TypedRoute.Post()
  callStaff(@TypedBody() body: CallStaffBody) {
    return this.callStaffService.callStaff(body.tableId, body.options);
  }
}