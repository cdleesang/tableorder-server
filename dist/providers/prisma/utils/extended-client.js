"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedPrismaClient = void 0;
const client_1 = require("@prisma/client");
const error_handle_extension_1 = require("../extensions/error-handle.extension");
function extendClient(basePrismaClient) {
    return basePrismaClient
        .$extends(error_handle_extension_1.errorHandleExtension);
}
class UntypedExtendedClient extends client_1.PrismaClient {
    constructor(options) {
        super(options);
        return extendClient(this);
    }
}
exports.ExtendedPrismaClient = UntypedExtendedClient;
//# sourceMappingURL=extended-client.js.map