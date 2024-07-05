import { Injectable } from '@nestjs/common';
import { ParingCodeRepository } from 'src/auth/ports/out/paring-code-repository';

@Injectable()
export class ParingCodeRepositoryImpl implements ParingCodeRepository {
  private paringCodes: { tableId: string; code: string; expiresAt: Date; }[] = [];

  constructor() {
    setInterval(() => this.clearExpiredParingCodes(), 60*1000);
  }

  saveParingCode(tableId: string, code: string, expiresIn: number = 5*60*1000): Promise<void> {
    if(this.paringCodes.some(paringCode => paringCode.code === code)) {
      throw new Error('Already exists');
    }

    this.paringCodes.push({
      tableId,
      code,
      expiresAt: new Date(Date.now() + expiresIn),
    });

    return Promise.resolve();
  }

  findByParingCode(code: string): Promise<{ tableId: string; expiresAt: Date; } | null> {
    return Promise.resolve(this.paringCodes.find(paringCode => paringCode.code === code) || null);
  }

  deleteParingCode(code: string): Promise<void> {
    this.paringCodes = this.paringCodes.filter(paringCode => paringCode.code !== code);
    return Promise.resolve();
  }

  private clearExpiredParingCodes() {
    this.paringCodes = this.paringCodes.filter(paringCode => paringCode.expiresAt > new Date());
  }
}