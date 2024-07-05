"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableId = void 0;
const common_1 = require("@nestjs/common");
exports.TableId = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tableId;
});
//# sourceMappingURL=table-id.decorator.js.map