import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SelversClientModule } from '../../providers/selvers-client/selvers-client.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    SelversClientModule,
    ScheduleModule.forRoot(),
    NotificationModule,
  ],
  controllers: [
    StoreController,
  ],
  providers: [
    StoreService,
  ],
})
export class StoreModule {}