import { Inject, Injectable } from '@nestjs/common';
import { AdminRefreshTokenRepository } from 'src/auth/ports/out/admin-refresh-token-repository';
import { CredentialVerificationService } from '../../../admin/domain/services/credential-verification.service';
import { AdminAuthorityRepository } from '../../ports/out/admin-authority-repository';
import { SignInFailedError } from '../errors/sign-in-failed-error';
import { AdminAuthority } from '../models/admin-authority';
import { TokenService } from './token.service';

interface Response {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AdminSignInService {
  constructor(
    @Inject(AdminAuthorityRepository) private readonly adminAuthorityRepository: AdminAuthorityRepository,
    @Inject(AdminRefreshTokenRepository) private readonly adminRefreshTokenRepository: AdminRefreshTokenRepository,
    private readonly credentialVerificationService: CredentialVerificationService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(signInId: string, password: string): Promise<Response> {
    const verified = await this.credentialVerificationService.execute(signInId, password);

    if(!verified) {
      throw new SignInFailedError();
    }

    let authority = await this.adminAuthorityRepository.findByAdminId(verified.id);

    if(!authority) {
      authority = new AdminAuthority(verified.id, []);
    }

    const accessToken = this.tokenService.issueAdminAccessToken(authority);
    const refreshTokenInfo = this.tokenService.issueAdminRefreshToken(authority);

    await this.adminRefreshTokenRepository.save(refreshTokenInfo);

    return {
      accessToken,
      refreshToken: refreshTokenInfo.refreshToken,
    };
  }
}