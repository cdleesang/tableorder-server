import { Module } from '@nestjs/common';
import { SelversClientModule } from '../../providers/selvers-client/selvers-client.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SelversClientModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    StoreController,
  ],
  providers: [
    StoreService,
  ],
})
export class StoreModule {}