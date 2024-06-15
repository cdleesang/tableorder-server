import type { AdminPermission } from './admin-permission.enum';

export interface AdminTokenPayload {
  adminId: string;
  permissions: AdminPermission[];
}