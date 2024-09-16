import { Global, Module } from '@nestjs/common';
import { SelversClientModule } from '../selvers-client';
import { LegacyPrismaService } from './legacy-prisma.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [SelversClientModule],
  providers: [
    PrismaService,
    LegacyPrismaService,
  ],
  exports: [
    PrismaService,
    LegacyPrismaService,
  ],
})
export class PrismaModule {}