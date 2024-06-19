import { Inject, Injectable } from '@nestjs/common';
import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminPermission } from 'src/auth/domain/models/admin-permission';
import { CanAdminAccessService } from 'src/auth/domain/services/can-admin-access.service';
import { AdminRepository } from '../../ports/out/admin-repository';
import { AdminPermissionDeniedError } from '../../../auth/domain/errors/admin-permission-denied-error';

@Injectable()
export class DeleteAdminService {
  constructor(
    @Inject(AdminRepository) private readonly adminRepository: AdminRepository,
    private readonly canAdminAccessService: CanAdminAccessService,
  ) {}

  async execute(authority: AdminAuthority, targetId: string): Promise<void> {
    const isAccessible = await this.canAdminAccessService.execute(authority, AdminPermission.DELETE_ADMIN);

    if(!(authority.adminId === targetId || isAccessible)) {
      throw new AdminPermissionDeniedError();
    }

    await this.adminRepository.deleteById(targetId);
  }
}