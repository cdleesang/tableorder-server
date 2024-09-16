import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { SelversClientModule } from '../../common/modules/selvers-client';

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