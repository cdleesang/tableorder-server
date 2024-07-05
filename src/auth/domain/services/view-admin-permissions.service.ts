import { Inject, Injectable } from '@nestjs/common';
import { AdminAuthorityRepository } from 'src/auth/ports/out/admin-authority-repository';
import { AdminPermission } from '../models/admin-permission';

@Injectable()
export class ViewAdminPermissionsService {
  constructor(
    @Inject(AdminAuthorityRepository) private readonly adminAuthorityRepository: AdminAuthorityRepository,
  ) {}

  async execute(adminId: string): Promise<AdminPermission[]> {
    const authorization = await this.adminAuthorityRepository.findByAdminId(adminId);

    if(!authorization) {
      return [];
    }
    
    return authorization.permissions;
  }
}