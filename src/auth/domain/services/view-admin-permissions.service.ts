import { Inject, Injectable } from '@nestjs/common';
import { AdminAuthorizationRepository } from 'src/auth/ports/out/admin-authorization-repository.port';
import { AdminPermission } from '../models/admin-permission.enum';

@Injectable()
export class ViewAdminPermissionsService {
  constructor(
    @Inject(AdminAuthorizationRepository) private readonly adminAuthorizationRepository: AdminAuthorizationRepository,
  ) {}

  async execute(adminId: string): Promise<AdminPermission[]> {
    const authorization = await this.adminAuthorizationRepository.findByAdminId(adminId);

    if(!authorization) {
      return [];
    }
    
    return authorization.permissions;
  }
}