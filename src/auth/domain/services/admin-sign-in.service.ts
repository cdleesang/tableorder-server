import { Inject, Injectable } from '@nestjs/common';
import { CredentialVerificationService } from '../../../admin/domain/services/credential-verification.service';
import { SignInFailedError } from '../errors/sign-in-failed.error';
import { TokenService } from './token.service';
import { AdminAuthorizationRepository } from '../../ports/out/admin-authorization-repository.port';
import { AdminAuthorization } from '../models/admin-authorization.model';

@Injectable()
export class AdminSignInService {
  constructor(
    @Inject(AdminAuthorizationRepository) private readonly adminAuthorizationRepository: AdminAuthorizationRepository,
    private readonly credentialVerificationService: CredentialVerificationService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(signInId: string, password: string): Promise<string> {
    const verified = await this.credentialVerificationService.execute(signInId, password);

    if(!verified) {
      throw new SignInFailedError();
    }

    let authorization = await this.adminAuthorizationRepository.findByAdminId(verified.id);

    if(!authorization) {
      authorization = new AdminAuthorization(verified.id, []);
    }

    return this.tokenService.issueAdminToken(authorization);
  }
}