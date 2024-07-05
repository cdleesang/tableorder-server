"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentTable = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentTable = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.table;
});
//# sourceMappingURL=current-table.decorator.js.map