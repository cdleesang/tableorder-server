import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { FirebirdModule } from '../firebird/firebird.module';
import { PosHTableRepository } from './pos-h-table.repository';

@Module({
  imports: [
    FirebirdModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('POS_DATABASE_HOST')!,
        port: parseInt(configService.get<string>('POS_DATABASE_PORT')!, 10),
        database: configService.get<string>('POS_DATABASE_FILE_PATH')!,
        user: configService.get<string>('POS_DATABASE_USER')!,
        password: configService.get<string>('POS_DATABASE_PASSWORD')!,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PosHTableRepository,
  ],
  exports: [
    PosHTableRepository,
  ],
})
export class PosRepositoryModule {}