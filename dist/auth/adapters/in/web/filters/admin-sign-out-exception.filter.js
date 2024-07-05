"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseAdminSignOutExceptionFilter = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const invalid_refresh_token_error_1 = require("../../../../domain/errors/invalid-refresh-token-error");
let AdminSignOutExceptionFilter = class AdminSignOutExceptionFilter extends core_2.BaseExceptionFilter {
    catch(exception, host) {
        if (exception instanceof invalid_refresh_token_error_1.InvalidRefreshTokenError) {
            super.catch(new common_1.UnauthorizedException(), host);
        }
        super.catch(exception, host);
    }
};
AdminSignOutExceptionFilter = __decorate([
    (0, common_1.Catch)(invalid_refresh_token_error_1.InvalidRefreshTokenError)
], AdminSignOutExceptionFilter);
const UseAdminSignOutExceptionFilter = () => (0, common_1.applyDecorators)((0, common_1.UseFilters)(AdminSignOutExceptionFilter), (0, core_1.TypedException)(401, '유효하지 않은 토큰'));
exports.UseAdminSignOutExceptionFilter = UseAdminSignOutExceptionFilter;
//# sourceMappingURL=admin-sign-out-exception.filter.js.map