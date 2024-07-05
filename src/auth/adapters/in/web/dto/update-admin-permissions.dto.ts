import { AdminPermission } from 'src/auth/domain/models/admin-permission';

export interface UpdateAdminPermissionsRequestDto {
  /** 권한 목록 */
  permissions: AdminPermission[];
}