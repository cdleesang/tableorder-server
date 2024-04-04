import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EasycallSelversClientService } from '../../providers/selvers-client/easycall-selvers-client.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { EntityNotFoundErrors } from '../../providers/prisma/errors/entity-not-found.error';

@Injectable()
export class CallStaffService {
  constructor(
    private readonly easyCallSelversClientService: EasycallSelversClientService,
    private readonly prismaService: PrismaService,
  ) {}

  async getCallOptions(): Promise<{
    /** 직원호출옵션 고유 아이디 */
    id: number;
    /** 직원호출 표시명 */
    title: string;
    /** 수량 선택 가능 여부 */
    isCountable: boolean;
  }[]> {
    const data = await this.easyCallSelversClientService.getCallStaffOptions();

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

      return this.easyCallSelversClientService.callStaff(
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