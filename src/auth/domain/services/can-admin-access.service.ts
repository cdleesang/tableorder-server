import { Injectable } from '@nestjs/common';
import type { AdminAuthority } from '../models/admin-authority';
import type { AdminPermission } from '../models/admin-permission';

@Injectable()
export class CanAdminAccessService {
  async execute(authority: AdminAuthority, permission: AdminPermission): Promise<boolean> {
    return authority.hasPermission(permission);
  }
}