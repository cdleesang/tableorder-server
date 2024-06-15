import { Inject, Injectable } from '@nestjs/common';
import { IsAdminActiveService } from 'src/admin/domain/services';
import { AdminAuthorizationRepository } from 'src/auth/ports/out/admin-authorization-repository.port';
import { AdminAuthorization } from '../models/admin-authorization.model';
import { TokenService } from './token.service';
import { AdminNotActiveError } from '../errors/admin-not-active.error';

@Injectable()
export class RenewTokenService {
  constructor(
    @Inject(AdminAuthorizationRepository) private readonly adminAuthorizationRepository: AdminAuthorizationRepository,
    private readonly isAdminActiveService: IsAdminActiveService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(adminAuthorization: AdminAuthorization): Promise<string> {
    if(!await this.isAdminActiveService.execute(adminAuthorization.adminId)) {
      throw new AdminNotActiveError();
    }

    const currentAuthorization = await this.adminAuthorizationRepository.findByAdminId(adminAuthorization.adminId);

    const newAuthorization = currentAuthorization ?? new AdminAuthorization(adminAuthorization.adminId, []);

    return this.tokenService.issueAdminToken(newAuthorization);
  }
}