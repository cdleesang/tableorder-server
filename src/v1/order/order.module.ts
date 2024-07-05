import { Module } from '@nestjs/common';
import { PosRepositoryModule } from 'src/common/modules/pos-repository/pos-repository.module';
import { SelversClientModule } from 'src/common/modules/selvers-client/selvers-client.module';
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