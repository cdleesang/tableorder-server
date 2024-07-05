"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthority = void 0;
class AdminAuthority {
    adminId;
    _permissions;
    constructor(adminId, _permissions) {
        this.adminId = adminId;
        this._permissions = _permissions;
    }
    get permissions() {
        return this._permissions;
    }
    hasPermission(permission) {
        return this._permissions.includes(permission);
    }
    addPermission(permission) {
        if (!this.hasPermission(permission)) {
            this._permissions.push(permission);
        }
    }
    removePermission(permission) {
        this._permissions = this._permissions.filter(p => p !== permission);
    }
    clearPermissions() {
        this._permissions = [];
    }
}
exports.AdminAuthority = AdminAuthority;
//# sourceMappingURL=admin-authority.js.map