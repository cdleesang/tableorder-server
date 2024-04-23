import { Module } from '@nestjs/common';
import { SelversClientModule } from '../../providers/selvers-client/selvers-client.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CartModule } from '../cart/cart.module';
import { PosRepositoryModule } from '../../providers/pos-repository/pos-repository.module';

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