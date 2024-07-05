"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseAdminPermissionDeniedExceptionFilter = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const admin_permission_denied_error_1 = require("../../domain/errors/admin-permission-denied-error");
let AdminPermissionDeniedExceptionFilter = class AdminPermissionDeniedExceptionFilter extends core_2.BaseExceptionFilter {
    catch(_, host) {
        super.catch(new common_1.ForbiddenException('Permission denied'), host);
    }
};
AdminPermissionDeniedExceptionFilter = __decorate([
    (0, common_1.Catch)(admin_permission_denied_error_1.AdminPermissionDeniedError)
], AdminPermissionDeniedExceptionFilter);
const UseAdminPermissionDeniedExceptionFilter = () => (0, common_1.applyDecorators)((0, common_1.UseFilters)(AdminPermissionDeniedExceptionFilter), (0, core_1.TypedException)(403, '권한 없음'));
exports.UseAdminPermissionDeniedExceptionFilter = UseAdminPermissionDeniedExceptionFilter;
//# sourceMappingURL=admin-permission-denied-exception.filter.js.map