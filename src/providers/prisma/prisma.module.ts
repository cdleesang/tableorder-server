import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SelversClientModule } from '../selvers-client/selvers-client.module';

@Global()
@Module({
  imports: [SelversClientModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}