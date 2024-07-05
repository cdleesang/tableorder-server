"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseAdminSignInExceptionFilter = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const sign_in_failed_error_1 = require("../../../../domain/errors/sign-in-failed-error");
let AdminSignInExceptionFilter = class AdminSignInExceptionFilter extends core_2.BaseExceptionFilter {
    catch(exception, host) {
        if (exception instanceof sign_in_failed_error_1.SignInFailedError) {
            super.catch(new common_1.UnauthorizedException('Sign in failed'), host);
            return;
        }
        super.catch(exception, host);
    }
};
AdminSignInExceptionFilter = __decorate([
    (0, common_1.Catch)(sign_in_failed_error_1.SignInFailedError)
], AdminSignInExceptionFilter);
const UseAdminSignInExceptionFilter = () => (0, common_1.applyDecorators)((0, common_1.UseFilters)(AdminSignInExceptionFilter), (0, core_1.TypedException)(401, '로그인 실패'));
exports.UseAdminSignInExceptionFilter = UseAdminSignInExceptionFilter;
//# sourceMappingURL=admin-sign-in-exception.filter.js.map