import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { NotificationModule } from '../notification/notification.module';
import { SelversClientModule } from '../../common/modules/selvers-client';

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