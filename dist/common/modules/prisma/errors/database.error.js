"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
class DatabaseError extends Error {
    prismaError;
    constructor(prismaError) {
        super('Database error');
        this.prismaError = prismaError;
    }
}
exports.DatabaseError = DatabaseError;
//# sourceMappingURL=database.error.js.map