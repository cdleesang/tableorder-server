import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FirebirdModule } from 'src/common/modules/firebird/firebird.module';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { OrderController } from './adapters/in/web/order.controller';
import { TableOrderHistoryRepositoryImpl } from './adapters/out/database/table-order-history-repository-impl';
import { ViewAllOrderHistoriesService } from './domain/services/view-all-order-histories.service';
import { ViewOrderHistorySelfService } from './domain/services/view-order-history-self.service';
import { TableOrderHistoryRepository } from './ports/out/order-history-repository';

@Module({
  imports: [
    FirebirdModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('POS_DATABASE_HOST')!,
        port: parseInt(configService.get<string>('POS_DATABASE_PORT')!, 10),
        database: configService.get<string>('POS_DATABASE_FILE_PATH')!,
        user: configService.get<string>('POS_DATABASE_USER')!,
        password: configService.get<string>('POS_DATABASE_PASSWORD')!,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [
    OrderController,
  ],
  providers: [
    ViewAllOrderHistoriesService,
    ViewOrderHistorySelfService,
    {provide: TableOrderHistoryRepository, useClass: TableOrderHistoryRepositoryImpl},
  ],
})
export class OrderModule {}