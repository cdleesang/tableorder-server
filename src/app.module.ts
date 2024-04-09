import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CallStaffModule } from './api/call-staff/call-staff.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { MenuModule } from './api/menu/menu.module';
import { CartModule } from './api/cart/cart.module';
import { StoreModule } from './api/store/store.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    CallStaffModule,
    MenuModule,
    CartModule,
    StoreModule,
    NotificationModule,
  ],
})
export class AppModule {}