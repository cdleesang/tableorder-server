import { Inject, Injectable } from '@nestjs/common';
import { AdminPermissionDeniedError } from '../errors/admin-permission-denied-error';
import { AdminAuthorityRepository } from '../../ports/out/admin-authority-repository';
import { AdminAuthority } from '../models/admin-authority';
import { AdminPermission } from '../models/admin-permission';
import { SelfPermissionChangeNotAllowedError } from '../errors/self-permission-change-not-allowed-error';

@Injectable()
export class UpdateAdminPermissionsService {
  constructor(
    @Inject(AdminAuthorityRepository) private readonly adminAuthorityRepository: AdminAuthorityRepository,
  ) {}

  async execute(authority: AdminAuthority, targetId: string, newPermissions: AdminPermission[]): Promise<void> {
    if(!authority.hasPermission(AdminPermission.MANAGE_ADMIN_PERMISSION)) {
      throw new AdminPermissionDeniedError();
    }

    if(authority.adminId === targetId) {
      throw new SelfPermissionChangeNotAllowedError();
    }

    let target = await this.adminAuthorityRepository.findByAdminId(targetId);

    if(!target) {
      target = new AdminAuthority(targetId, []);
    }
    
    target.clearPermissions();

    newPermissions.forEach(p => target.addPermission(p));

    await this.adminAuthorityRepository.save(target);
  }
}