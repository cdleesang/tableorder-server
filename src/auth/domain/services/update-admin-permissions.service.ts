import { Inject, Injectable } from '@nestjs/common';
import { AdminPermissionDeniedError } from '../errors/admin-permission-denied.error';
import { AdminAuthorizationRepository } from '../../ports/out/admin-authorization-repository.port';
import { AdminAuthorization } from '../models/admin-authorization.model';
import { AdminPermission } from '../models/admin-permission.enum';
import { SelfPermissionChangeNotAllowedError } from '../errors/self-permission-change-not-allowed.error';

@Injectable()
export class UpdateAdminPermissionsService {
  constructor(
    @Inject(AdminAuthorizationRepository) private readonly adminAuthorizationRepository: AdminAuthorizationRepository,
  ) {}

  async execute(authorization: AdminAuthorization, targetId: string, newPermissions: AdminPermission[]): Promise<void> {
    if(!authorization.hasPermission(AdminPermission.MANAGE_ADMIN_PERMISSION)) {
      throw new AdminPermissionDeniedError();
    }

    if(authorization.adminId === targetId) {
      throw new SelfPermissionChangeNotAllowedError();
    }

    let target = await this.adminAuthorizationRepository.findByAdminId(targetId);

    if(!target) {
      target = new AdminAuthorization(targetId, []);
    }
    
    target.clearPermissions();

    newPermissions.forEach(p => target.addPermission(p));

    await this.adminAuthorizationRepository.save(target);
  }
}