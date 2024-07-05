import { Global, Module } from '@nestjs/common';
import { LegacyPrismaService } from './legacy-prisma.service';
import { SelversClientModule } from '../selvers-client/selvers-client.module';
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