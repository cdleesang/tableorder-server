"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyExtendedPrismaClient = void 0;
const client_1 = require("@prisma/client");
const legacy_error_handle_extension_1 = require("../extensions/legacy-error-handle.extension");
function extendClient(basePrismaClient) {
    return basePrismaClient
        .$extends(legacy_error_handle_extension_1.legacyErrorHandleExtension);
}
class UntypedExtendedClient extends client_1.PrismaClient {
    constructor(options) {
        super(options);
        return extendClient(this);
    }
}
exports.LegacyExtendedPrismaClient = UntypedExtendedClient;
//# sourceMappingURL=legacy-extended-client.js.map