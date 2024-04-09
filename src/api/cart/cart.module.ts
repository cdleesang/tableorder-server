import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SelversClientModule } from '../../providers/selvers-client/selvers-client.module';

@Module({
  imports: [
    SelversClientModule,
  ],
  controllers: [
    CartController,
  ],
  providers: [
    CartService,
  ],
  exports: [
    CartService,
  ],
})
export class CartModule {}