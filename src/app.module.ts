import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrderModule } from './order/order.module';
import { ConfigModule } from './config';
import { PrismaModule } from './common/modules/prisma';
import { AdminModule } from './admin/admin.module';
import { TableModule } from './table/table.module';
import { AuthModule } from './auth/auth.module';
import { V1Module } from './v1/v1.module';

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
    V1Module,
  ],
})
export class AppModule {}