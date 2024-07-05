"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseTableGuard = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const table_guard_1 = require("../guards/table.guard");
const UseTableGuard = () => (0, common_1.applyDecorators)((0, common_1.UseGuards)(table_guard_1.TableGuard), (0, core_1.TypedException)(401, '로그인되지 않음'));
exports.UseTableGuard = UseTableGuard;
//# sourceMappingURL=use-table-guard.decorator.js.map