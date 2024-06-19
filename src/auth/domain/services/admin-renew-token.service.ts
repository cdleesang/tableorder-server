import { Inject, Injectable } from '@nestjs/common';
import { AdminAuthorityRepository } from 'src/auth/ports/out/admin-authority-repository';
import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { AdminAuthority } from '../models/admin-authority';
import { AdminRefreshTokenInfo } from '../models/admin-refresh-token-info';
import { TokenService } from './token.service';
import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token-error';

interface Response {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AdminRenewTokenService {
  constructor(
    @Inject(AdminAuthorityRepository) private readonly adminAuthorityRepository: AdminAuthorityRepository,
    @Inject(AdminRefreshTokenRepository) private readonly adminRefreshTokenRepository: AdminRefreshTokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(currentRefreshToken: string): Promise<Response> {
    const isValid = this.tokenService.checkAdminRefreshToken(currentRefreshToken);

    if(!isValid) {
      throw new InvalidRefreshTokenError();
    }

    const { adminId, exp } = this.tokenService.decodeAdminRefreshToken(currentRefreshToken);
    const currentRefreshTokenInfo = new AdminRefreshTokenInfo(adminId, currentRefreshToken, new Date(exp! * 1000));
    const isExists = await this.adminRefreshTokenRepository.isExists(currentRefreshTokenInfo.adminId, currentRefreshToken);

    if(!isExists) {
      throw new InvalidRefreshTokenError();
    }

    const adminAuthority = (await this.adminAuthorityRepository.findByAdminId(currentRefreshTokenInfo.adminId))
      ?? new AdminAuthority(currentRefreshTokenInfo.adminId, []);

    const accessToken = this.tokenService.issueAdminAccessToken(adminAuthority);
    const newRefreshTokenInfo = this.tokenService.issueAdminRefreshToken(adminAuthority);

    await this.adminRefreshTokenRepository.deleteByRefreshToken(currentRefreshTokenInfo.adminId, currentRefreshToken);
    await this.adminRefreshTokenRepository.save(newRefreshTokenInfo);

    return {
      accessToken,
      refreshToken: newRefreshTokenInfo.refreshToken,
    };
  }
}