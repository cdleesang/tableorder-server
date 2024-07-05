import type { AdminAuthority } from '../models/admin-authority';
import type { AdminPermission } from '../models/admin-permission';
export declare class CanAdminAccessService {
    execute(authority: AdminAuthority, permission: AdminPermission): Promise<boolean>;
}
