import { Inject, Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { ParingCodeRepository } from 'src/auth/ports/out/paring-code-repository';
import { GetTableNameByIdService } from 'src/table/domain/services/get-table-name-by-id.service';
import { AdminPermissionDeniedError } from '../errors/admin-permission-denied-error';
import { InvalidParingCodeError } from '../errors/invalid-paring-code-error';
import { AdminAuthority } from '../models/admin-authority';
import { AdminPermission } from '../models/admin-permission';
import { Table } from '../models/table';
import { TokenService } from './token.service';

@Injectable()
export class TableParingService {
  constructor(
    @Inject(ParingCodeRepository) private readonly paringCodeRepository: ParingCodeRepository,
    private getTableNameByIdService: GetTableNameByIdService,
    private readonly tokenService: TokenService,
  ) {}

  async generateParingCode(adminAuthority: AdminAuthority, tableId: string): Promise<string> {
    if(!adminAuthority.hasPermission(AdminPermission.PARING_TABLE)) {
      throw new AdminPermissionDeniedError();
    }

    return this.recursiveGenerateParingCode(tableId);
  }

  async paring(paringCode: string): Promise<string> {
    const result = await this.paringCodeRepository.findByParingCode(paringCode);

    if(!result) {
      throw new InvalidParingCodeError();
    }

    if(result.expiresAt && result.expiresAt < new Date()) {
      throw new InvalidParingCodeError();
    }

    await this.paringCodeRepository.deleteParingCode(paringCode);

    const tableName = await this.getTableNameByIdService.execute(result.tableId);

    const table = new Table(result.tableId, tableName);
    
    return this.tokenService.issueTableAccessToken(table);
  }

  private async recursiveGenerateParingCode(tableId: string, retries: number = 5): Promise<string> {
    try {
      const nanoid = customAlphabet('1234567890', 6);
      const paringCode = nanoid();
  
      await this.paringCodeRepository.saveParingCode(tableId, paringCode, 5*60*1000);
      
      return paringCode;
    } catch(e) {
      if(retries <= 0) {
        throw e;
      }

      return this.recursiveGenerateParingCode(tableId, retries - 1);
    }
  }
}