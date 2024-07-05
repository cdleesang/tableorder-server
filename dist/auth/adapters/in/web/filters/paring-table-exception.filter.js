"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseParingTableExceptionFilter = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const invalid_paring_code_error_1 = require("../../../../domain/errors/invalid-paring-code-error");
let ParingTableExceptionFilter = class ParingTableExceptionFilter extends core_2.BaseExceptionFilter {
    catch(exception, host) {
        if (exception instanceof invalid_paring_code_error_1.InvalidParingCodeError) {
            super.catch(new common_1.NotFoundException('Invalid paring code'), host);
            return;
        }
        super.catch(exception, host);
    }
};
ParingTableExceptionFilter = __decorate([
    (0, common_1.Catch)(invalid_paring_code_error_1.InvalidParingCodeError)
], ParingTableExceptionFilter);
const UseParingTableExceptionFilter = () => (0, common_1.applyDecorators)((0, common_1.UseFilters)(ParingTableExceptionFilter), (0, core_1.TypedException)(404, '일치하는 페어링코드를 찾을 수 없음'));
exports.UseParingTableExceptionFilter = UseParingTableExceptionFilter;
//# sourceMappingURL=paring-table-exception.filter.js.map