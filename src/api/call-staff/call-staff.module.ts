import { Module } from '@nestjs/common';
import { SelversClientModule } from '../../providers/selvers-client/selvers-client.module';
import { CallStaffController } from './call-staff.controller';
import { CallStaffService } from './call-staff.service';

@Module({
  imports: [
    SelversClientModule,
  ],
  controllers: [
    CallStaffController,
  ],
  providers: [
    CallStaffService,
  ],
})
export class CallStaffModule {}