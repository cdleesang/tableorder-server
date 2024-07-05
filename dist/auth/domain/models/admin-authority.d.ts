import type { AdminPermission } from './admin-permission';
export declare class AdminAuthority {
    readonly adminId: string;
    private _permissions;
    constructor(adminId: string, _permissions: AdminPermission[]);
    get permissions(): AdminPermission[];
    hasPermission(permission: AdminPermission): boolean;
    addPermission(permission: AdminPermission): void;
    removePermission(permission: AdminPermission): void;
    clearPermissions(): void;
}
