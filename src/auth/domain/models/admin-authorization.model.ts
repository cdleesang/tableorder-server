import type { AdminPermission } from './admin-permission.enum';

export class AdminAuthorization {
  constructor(
    public readonly adminId: string,
    private _permissions: AdminPermission[],
  ) {}

  get permissions(): AdminPermission[] {
    return this._permissions;
  }

  hasPermission(permission: AdminPermission): boolean {
    return this._permissions.includes(permission);
  }

  addPermission(permission: AdminPermission): void {
    if(!this.hasPermission(permission)) {
      this._permissions.push(permission);
    }
  }

  removePermission(permission: AdminPermission): void {
    this._permissions = this._permissions.filter(p => p !== permission);
  }

  clearPermissions(): void {
    this._permissions = [];
  }
}