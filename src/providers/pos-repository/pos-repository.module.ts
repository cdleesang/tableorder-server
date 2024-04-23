import { Module } from '@nestjs/common';
import { FirebirdModule } from '../firebird/firebird.module';
import { PosHTableRepository } from './pos-h-table.repository';

@Module({
  imports: [
    FirebirdModule,
  ],
  providers: [
    PosHTableRepository,
  ],
  exports: [
    PosHTableRepository,
  ],
})
export class PosRepositoryModule {}