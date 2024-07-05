import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CallStaffModule } from './v1/call-staff/call-staff.module';
import { CartModule } from './v1/cart/cart.module';
import { MenuModule } from './v1/menu/menu.module';
import { NotificationModule } from './v1/notification/notification.module';
import { OrderModule as LegacyOrderModule } from './v1/order/order.module';
import { OrderModule } from './order/order.module';
import { StoreModule } from './v1/store/store.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { TableModule } from './table/table.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'customer-frontend'),
    }),
    PrismaModule,
    ConfigModule,
    AdminModule,
    TableModule,
    OrderModule,
    AuthModule,
    CallStaffModule,
    MenuModule,
    CartModule,
    StoreModule,
    LegacyOrderModule,
    NotificationModule,
  ],
})
export class AppModule {}