import type { JwtPayload } from 'jsonwebtoken';
import type { AdminPermission } from './admin-permission';
export interface AdminAccessTokenPayload {
    adminId: string;
    permissions: AdminPermission[];
}
export interface AdminRefreshTokenPayload extends JwtPayload {
    adminId: string;
}
