import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'src/config';
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