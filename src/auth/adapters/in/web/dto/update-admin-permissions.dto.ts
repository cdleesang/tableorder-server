import { AdminPermission } from 'src/auth/domain/models/admin-permission.enum';

export interface UpdateAdminPermissionsRequestDto {
  permissions: AdminPermission[];
}