import { Module } from '@nestjs/common';
import { CallStaffModule } from './call-staff/call-staff.module';
import { CartModule } from './cart/cart.module';
import { MenuModule } from './menu/menu.module';
import { StoreModule } from './store/store.module';
import { NotificationModule } from './notification/notification.module';
import { OrderModule } from './order/order.module';

/**
 * 셀버스에 의존하는 1버전 모듈
 */
@Module({
  imports: [
    CallStaffModule,
    CartModule,
    MenuModule,
    StoreModule,
    NotificationModule,
    OrderModule,
  ],
})
export class V1Module {}