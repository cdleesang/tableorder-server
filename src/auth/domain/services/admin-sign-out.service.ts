import { Inject, Injectable } from '@nestjs/common';
import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { AdminAuthority } from '../models/admin-authority';
import { TokenService } from './token.service';
import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token-error';

@Injectable()
export class AdminSignOutService {
  constructor(
    @Inject(AdminRefreshTokenRepository) private readonly adminRefreshTokenRepository: AdminRefreshTokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(authority: AdminAuthority, refreshToken: string): Promise<void> {
    const isValid = this.tokenService.checkAdminRefreshToken(refreshToken);

    if(!isValid) {
      throw new InvalidRefreshTokenError();
    }

    await this.adminRefreshTokenRepository.deleteByRefreshToken(authority.adminId, refreshToken);
  }
}