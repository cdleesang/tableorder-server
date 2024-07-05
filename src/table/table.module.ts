import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FirebirdModule } from 'src/common/modules/firebird/firebird.module';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { TableController } from './adapters/in/web/table.controller';
import { TableRepositoryImpl } from './adapters/out/database/table-repository-impl';
import { GetTableNameByIdService } from './domain/services/get-table-name-by-id.service';
import { TableService } from './domain/services/table.service';
import { TableRepository } from './ports/out/table-repository';

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
    forwardRef(() => AuthModule),
  ],
  controllers: [
    TableController,
  ],
  providers: [
    TableService,
    GetTableNameByIdService,
    {provide: TableRepository, useClass: TableRepositoryImpl},
  ],
  exports: [
    GetTableNameByIdService,
  ],
})
export class TableModule {}