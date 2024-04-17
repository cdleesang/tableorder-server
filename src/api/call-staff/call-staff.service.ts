import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { EntityNotFoundErrors } from '../../providers/prisma/errors/entity-not-found.error';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { SelversClientService } from '../../providers/selvers-client/selvers-client.service';
import { GetCallStaffOptionsResponse } from './types/call-staff-response.type';

@Injectable()
export class CallStaffService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly selversClientService: SelversClientService,
  ) {}

  async getCallOptions(): Promise<GetCallStaffOptionsResponse> {
    const storeId = this.configService.get('STORE_ID');
    const data = await this.selversClientService.easycall.getCallStaffOptions(storeId);

    return data.items.map(item => ({
      id: parseInt(item.EasyCallSetup.id, 10),
      title: item.EasyCallSetup.title,
      isCountable: item.EasyCallSetup.quantity_yn === 'Y',
    }));
  }

  async callStaff(
    tableId: number,
    options: {
      id: number,
      title: string,
      quantity: number,
    }[],
  ): Promise<true> {
    try {
      const result = await this.prismaService.table.findFirst({
        select: { storeTableId: true },
        where: { id: tableId },
      });
      const storeId = this.configService.get('STORE_ID');
      return this.selversClientService.easycall.callStaff(
        storeId,
        result!.storeTableId!,
        options.map(option => ({
          ...option,
          id: option.id.toString(),
          count: option.quantity,
        })),
      );
    } catch(err) {
      if(err instanceof EntityNotFoundErrors.Table) {
        throw new NotFoundException('일치하는 테이블 번호를 찾을 수 없습니다.');
      }

      throw new InternalServerErrorException('직원 호출에 실패했습니다.');
    }
  }
}