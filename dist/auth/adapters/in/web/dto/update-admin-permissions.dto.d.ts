import { AdminPermission } from 'src/auth/domain/models/admin-permission';
export interface UpdateAdminPermissionsRequestDto {
    permissions: AdminPermission[];
}
