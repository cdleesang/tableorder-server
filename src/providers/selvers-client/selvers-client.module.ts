import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { EasycallSelversClientService } from './easycall-selvers-client.service';
import { WWWSelversClientService } from './www-selvers-client.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        headers: {
          'x-selvers-api-v2-access-token': configService.get('ACCESS_TOKEN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    EasycallSelversClientService,
    WWWSelversClientService,
  ],
  exports: [
    EasycallSelversClientService,
    WWWSelversClientService,
  ],
})
export class SelversClientModule {}