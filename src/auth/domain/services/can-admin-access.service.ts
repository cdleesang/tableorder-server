import { Injectable } from '@nestjs/common';
import type { AdminAuthorization } from '../models/admin-authorization.model';
import type { AdminPermission } from '../models/admin-permission.enum';

@Injectable()
export class CanAdminAccessService {
  async execute(authorization: AdminAuthorization, permission: AdminPermission): Promise<boolean> {
    return authorization.hasPermission(permission);
  }
}