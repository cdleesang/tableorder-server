import { Inject, Injectable } from '@nestjs/common';
import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { AdminAuthority } from '../models/admin-authority';

@Injectable()
export class AdminSignOutAllService {
  constructor(
    @Inject(AdminRefreshTokenRepository) private readonly adminRefreshTokenRepository: AdminRefreshTokenRepository,
  ) {}

  async execute(authority: AdminAuthority): Promise<void> {
    await this.adminRefreshTokenRepository.deleteAll(authority.adminId);
  }
}