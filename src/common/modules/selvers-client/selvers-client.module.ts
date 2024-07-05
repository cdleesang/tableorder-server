import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { SelversClientService } from './selvers-client.service';

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
    SelversClientService,
  ],
  exports: [
    SelversClientService,
  ],
})
export class SelversClientModule {}