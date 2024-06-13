import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CallStaffModule } from './api/call-staff/call-staff.module';
import { CartModule } from './api/cart/cart.module';
import { MenuModule } from './api/menu/menu.module';
import { NotificationModule } from './api/notification/notification.module';
import { OrderModule } from './api/order/order.module';
import { StoreModule } from './api/store/store.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'customer-frontend'),
    }),
    PrismaModule,
    ConfigModule,
    AdminModule,
    CallStaffModule,
    MenuModule,
    CartModule,
    StoreModule,
    OrderModule,
    NotificationModule,
  ],
})
export class AppModule {}