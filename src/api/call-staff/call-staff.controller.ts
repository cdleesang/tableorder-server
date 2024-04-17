import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { CallStaffService } from './call-staff.service';
import { CallStaffBody } from './types/call-staff-request.type';
import { GetCallStaffOptionsResponse } from './types/call-staff-response.type';
import { TableIdGuard } from '../auth/table-id.guard';
import { TableId } from '../auth/decorators/table-id.decorator';

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
   * @security tid
   */
  @TypedRoute.Post()
  @UseGuards(TableIdGuard)
  callStaff(@TableId() tableId: number, @TypedBody() body: CallStaffBody): Promise<true> {
    return this.callStaffService.callStaff(tableId, body.options);
  }
}