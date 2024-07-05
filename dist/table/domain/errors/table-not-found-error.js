"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableNotFoundError = void 0;
class TableNotFoundError extends Error {
    constructor(tableId) {
        super(`Table with id ${tableId} not found`);
    }
}
exports.TableNotFoundError = TableNotFoundError;
//# sourceMappingURL=table-not-found-error.js.map