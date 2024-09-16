import { Module } from '@nestjs/common';
import { PosRepositoryModule } from 'src/common/modules/pos-repository';
import { SelversClientModule } from 'src/common/modules/selvers-client';
import { CartModule } from '../cart/cart.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    SelversClientModule,
    CartModule,
    PosRepositoryModule,
  ],
  controllers: [
    OrderController,
  ],
  providers: [
    OrderService,
  ],
})
export class OrderModule {}