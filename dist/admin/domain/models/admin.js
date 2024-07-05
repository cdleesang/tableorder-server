"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const nanoid_1 = require("nanoid");
const hash_util_1 = require("../../../common/utils/hash.util");
class Admin {
    id;
    signInId;
    _hashedPassword;
    name;
    joinedAt;
    constructor(id, signInId, _hashedPassword, name, joinedAt = new Date()) {
        this.id = id;
        this.signInId = signInId;
        this._hashedPassword = _hashedPassword;
        this.name = name;
        this.joinedAt = joinedAt;
    }
    static generateId() {
        return (0, nanoid_1.nanoid)();
    }
    get hashedPassword() {
        return this._hashedPassword;
    }
    setPassword(password) {
        this._hashedPassword = hash_util_1.Hash.hash(password);
    }
    validatePassword(password) {
        return hash_util_1.Hash.compare(password, this._hashedPassword);
    }
}
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map