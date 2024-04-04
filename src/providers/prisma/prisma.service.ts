import { Injectable, OnModuleInit } from '@nestjs/common';
import { ExtendedPrismaClient } from './utils/extended-client';

@Injectable()
export class PrismaService extends ExtendedPrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}