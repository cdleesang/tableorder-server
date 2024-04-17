import { Module } from '@nestjs/common';
import { SelversClientModule } from '../../providers/selvers-client/selvers-client.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [
    SelversClientModule,
  ],
  controllers: [
    MenuController,
  ],
  providers: [
    MenuService,
  ],
})
export class MenuModule {}