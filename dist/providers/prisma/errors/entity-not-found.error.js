"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundErrors = void 0;
const client_1 = require("@prisma/client");
exports.EntityNotFoundErrors = Object.keys(client_1.Prisma.ModelName).reduce((prev, curr) => ({
    ...prev,
    [curr]: class EntityNotFoundError extends Error {
        constructor() {
            super(`${curr} not found`);
        }
    },
}), {});
//# sourceMappingURL=entity-not-found.error.js.map