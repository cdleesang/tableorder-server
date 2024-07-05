"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseUpdateOwnPasswordExceptionFilter = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const admin_not_found_error_1 = require("../../../../domain/errors/admin-not-found-error");
const incorrect_password_error_1 = require("../../../../domain/errors/incorrect-password-error");
let UpdateOwnPasswordExceptionFilter = class UpdateOwnPasswordExceptionFilter extends core_2.BaseExceptionFilter {
    catch(exception, host) {
        if (exception instanceof admin_not_found_error_1.AdminNotFoundError) {
            super.catch(new common_1.NotFoundException('Admin not found'), host);
            return;
        }
        if (exception instanceof incorrect_password_error_1.IncorrectPasswordError) {
            super.catch(new common_1.ConflictException('Incorrect password'), host);
            return;
        }
        super.catch(exception, host);
    }
};
UpdateOwnPasswordExceptionFilter = __decorate([
    (0, common_1.Catch)(admin_not_found_error_1.AdminNotFoundError, incorrect_password_error_1.IncorrectPasswordError)
], UpdateOwnPasswordExceptionFilter);
const UseUpdateOwnPasswordExceptionFilter = () => (0, common_1.applyDecorators)((0, common_1.UseFilters)(UpdateOwnPasswordExceptionFilter), (0, core_1.TypedException)(404, '관리자를 찾을 수 없음'), (0, core_1.TypedException)(409, '현재 비밀번호가 일치하지 않음'));
exports.UseUpdateOwnPasswordExceptionFilter = UseUpdateOwnPasswordExceptionFilter;
//# sourceMappingURL=update-own-password-exception.filter.js.map