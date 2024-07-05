"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseAdminGuard = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
const UseAdminGuard = () => (0, common_1.applyDecorators)((0, common_1.UseGuards)(admin_guard_1.AdminGuard), (0, core_1.TypedException)(401, '로그인되지 않음'));
exports.UseAdminGuard = UseAdminGuard;
//# sourceMappingURL=use-admin-guard.decorator.js.map