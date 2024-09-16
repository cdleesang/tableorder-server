import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { TableId, TableIdGuard } from '../auth';
import { CallStaffService } from './call-staff.service';
import { CallStaffDto, GetCallStaffOptionsDto } from './dto';

@Controller({path: 'call-staff', version: VERSION_NEUTRAL})
export class CallStaffController {
  constructor(private readonly callStaffService: CallStaffService) {}

  /**
   * 직원 호출 옵션 조회.
   * 
   * @tag 직원호출
   */
  @TypedRoute.Get('option')
  getCallStaffOptions(): Promise<GetCallStaffOptionsDto.Response> {
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
  callStaff(@TableId() tableId: number, @TypedBody() body: CallStaffDto.Request): Promise<true> {
    return this.callStaffService.callStaff(tableId, body.options);
  }
}