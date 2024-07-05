"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.legacyErrorHandleExtension = void 0;
const client_1 = require("@prisma/client");
const database_error_1 = require("../errors/database.error");
const entity_not_found_error_1 = require("../errors/entity-not-found.error");
const unique_field_duplicate_error_1 = require("../errors/unique-field-duplicate.error");
exports.legacyErrorHandleExtension = client_1.Prisma.defineExtension({
    name: 'legacy error handle',
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                let result;
                try {
                    result = await query(args);
                }
                catch (err) {
                    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                        switch (err.code) {
                            case 'P2002':
                                throw new unique_field_duplicate_error_1.UniqueFieldDuplicateError(err.meta.target[0]);
                            case 'P2025':
                                if (model) {
                                    throw new entity_not_found_error_1.EntityNotFoundErrors[model]();
                                }
                        }
                    }
                    throw new database_error_1.DatabaseError();
                }
                if (operation === 'findFirst' || operation === 'findUnique') {
                    const isRawQuery = !model;
                    if (!result && !isRawQuery) {
                        throw new entity_not_found_error_1.EntityNotFoundErrors[model]();
                    }
                }
                return result;
            },
        },
    },
});
//# sourceMappingURL=legacy-error-handle.extension.js.map