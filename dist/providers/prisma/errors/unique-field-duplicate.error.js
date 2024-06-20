"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueFieldDuplicateError = void 0;
class UniqueFieldDuplicateError extends Error {
    constructor(field) {
        super(`'${field}' field must be unique.`);
    }
}
exports.UniqueFieldDuplicateError = UniqueFieldDuplicateError;
//# sourceMappingURL=unique-field-duplicate.error.js.map