import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SelversClientService } from '../selvers-client';
import { legacyErrorHandleExtension } from './extensions';

function extendClient(basePrismaClient: PrismaClient) {
  return basePrismaClient
    .$extends(legacyErrorHandleExtension);
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    // eslint-disable-next-line no-constructor-return
    return extendClient(this) as this;
  }
}

export const LegacyExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0]
) => ReturnType<typeof extendClient>;

@Injectable()
export class LegacyPrismaService extends LegacyExtendedPrismaClient implements OnModuleInit {
  constructor(private readonly selversClientService: SelversClientService) {
    super({
      log: ['error'],
      errorFormat: 'pretty',
    });
  }

  async getMemberIdByTableId(tableId: number) {
    const result = await this.selversTable.findUnique({
      select: {memberId: true},
      where: {id: tableId},
    });

    return result!.memberId!;
  }

  async onModuleInit() {
    await this.$connect();

    const accounts = await this.selversTable.findMany({
      select: {
        signInId: true,
        password: true,
      },
    });

    // NOTE: 서버 실행 시 셀버스의 로그인정보를 불러옴
    const settledResults = await Promise.allSettled(accounts.map(async account => {
      return this.selversClientService.auth.tableLogin(account.signInId, account.password);
    }));

    const loginInfos = settledResults
      .filter((result): result is PromiseFulfilledResult<Awaited<ReturnType<typeof this.selversClientService.auth.tableLogin>>> => {
        if(result.status === 'rejected') {
          throw new Error('셀버스의 테이블 정보와 데이터베이스가 일치하지 않습니다.');
        }

        return true;
      })
      .map(result => result.value.member);

    // NOTE: SQLite 사용으로 createMany 메서드를 사용할 수 없어 트랜잭션으로 처리
    await this.$transaction([
      ...loginInfos.map(loginInfo => this.selversTable.update({
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