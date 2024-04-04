import { Injectable, OnModuleInit } from '@nestjs/common';
import { WWWSelversClientService } from '../selvers-client/www-selvers-client.service';
import { ExtendedPrismaClient } from './utils/extended-client';

@Injectable()
export class PrismaService extends ExtendedPrismaClient implements OnModuleInit {
  constructor(private readonly wwwSelversClientService: WWWSelversClientService) {
    super({
      log: ['error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();

    const accounts = await this.table.findMany({
      select: {
        signInId: true,
        password: true,
      },
    });

    // NOTE: 서버 실행 시 셀버스의 로그인정보를 불러옴
    const settledResults = await Promise.allSettled(accounts.map(async account => {
      return this.wwwSelversClientService.tableLogin(account.signInId, account.password);
    }));

    const loginInfos = settledResults
      .filter((result): result is PromiseFulfilledResult<Awaited<ReturnType<typeof this.wwwSelversClientService.tableLogin>>> => {
        if(result.status === 'rejected') {
          throw new Error('셀버스의 테이블 정보와 데이터베이스가 일치하지 않습니다.');
        }

        return true;
      })
      .map(result => result.value.member);

    // NOTE: SQLite 사용으로 createMany 메서드를 사용할 수 없어 트랜잭션으로 처리
    await this.$transaction([
      ...loginInfos.map(loginInfo => this.table.update({
        where: { id: parseInt(loginInfo.StoreTable.seq, 10) },
        data: {
          memberId: loginInfo.Member.id,
          storeTableId: loginInfo.StoreTable.id,
        },
      })),
    ]);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}