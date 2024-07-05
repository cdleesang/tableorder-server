"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
const bcrypt = require("bcryptjs");
class Hash {
    static SALT_ROUNDS = 10;
    static hash(string) {
        return bcrypt.hashSync(string, this.SALT_ROUNDS);
    }
    static compare(string, hashedString) {
        return bcrypt.compareSync(string, hashedString);
    }
}
exports.Hash = Hash;
//# sourceMappingURL=hash.util.js.map