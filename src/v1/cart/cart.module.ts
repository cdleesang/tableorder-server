import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SelversClientModule } from '../../common/modules/selvers-client';

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