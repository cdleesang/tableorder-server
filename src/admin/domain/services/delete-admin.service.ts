import { Inject, Injectable } from '@nestjs/common';
import type { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminPermission } from 'src/auth/domain/models/admin-permission.enum';
import { CanAdminAccessService } from 'src/auth/domain/services/can-admin-access.service';
import { AdminRepository } from '../../ports/out/admin-repository.port';
import { AdminPermissionDeniedError } from '../errors/admin-permission-denied.error';

@Injectable()
export class DeleteAdminService {
  constructor(
    private readonly canAdminAccessService: CanAdminAccessService,
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
  ) {}

  async execute(adminAuthorization: AdminAuthorization, targetId: string): Promise<void> {
    const isAccessible = await this.canAdminAccessService.execute(adminAuthorization, AdminPermission.DELETE_ADMIN);

    if(!isAccessible) {
      throw new AdminPermissionDeniedError();
    }

    await this.adminRepository.deleteById(targetId);
  }
}