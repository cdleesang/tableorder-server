import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CallStaffModule } from './api/call-staff/call-staff.module';
import { PrismaModule } from './providers/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    CallStaffModule,
  ],
})
export class AppModule {}