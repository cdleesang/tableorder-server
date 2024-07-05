"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseUpdateOwnProfileExceptionFilter = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const admin_not_found_error_1 = require("../../../../domain/errors/admin-not-found-error");
let UpdateOwnProfileExceptionFilter = class UpdateOwnProfileExceptionFilter extends core_2.BaseExceptionFilter {
    catch(exception, host) {
        if (exception instanceof admin_not_found_error_1.AdminNotFoundError) {
            super.catch(new common_1.NotFoundException('Admin not found'), host);
            return;
        }
        super.catch(exception, host);
    }
};
UpdateOwnProfileExceptionFilter = __decorate([
    (0, common_1.Catch)(admin_not_found_error_1.AdminNotFoundError)
], UpdateOwnProfileExceptionFilter);
const UseUpdateOwnProfileExceptionFilter = () => (0, common_1.applyDecorators)((0, common_1.UseFilters)(UpdateOwnProfileExceptionFilter), (0, core_1.TypedException)(404, '관리자를 찾을 수 없음'));
exports.UseUpdateOwnProfileExceptionFilter = UseUpdateOwnProfileExceptionFilter;
//# sourceMappingURL=update-own-profile-exception.filter.js.map