"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const services_1 = require("../../../domain/services");
const current_admin_decorator_1 = require("../../../../auth/utils/decorators/current-admin.decorator");
const use_admin_guard_decorator_1 = require("../../../../auth/utils/decorators/use-admin-guard.decorator");
const admin_permission_denied_exception_filter_1 = require("../../../../auth/utils/filters/admin-permission-denied-exception.filter");
const filters_1 = require("./filters");
let AdminController = class AdminController {
    signUpAdminService;
    searchAdminsService;
    viewAdminOwnProfileService;
    updateAdminOwnProfileService;
    updateAdminOwnPasswordService;
    deleteAdminService;
    constructor(signUpAdminService, searchAdminsService, viewAdminOwnProfileService, updateAdminOwnProfileService, updateAdminOwnPasswordService, deleteAdminService) {
        this.signUpAdminService = signUpAdminService;
        this.searchAdminsService = searchAdminsService;
        this.viewAdminOwnProfileService = viewAdminOwnProfileService;
        this.updateAdminOwnProfileService = updateAdminOwnProfileService;
        this.updateAdminOwnPasswordService = updateAdminOwnPasswordService;
        this.deleteAdminService = deleteAdminService;
    }
    signUp(body) {
        return this.signUpAdminService.execute(body.signInId, body.password, body.name);
    }
    search(query) {
        return this.searchAdminsService.execute(query.page, query.size);
    }
    viewOwnProfile(authority) {
        return this.viewAdminOwnProfileService.execute(authority);
    }
    updateOwnProfile(authority, body) {
        return this.updateAdminOwnProfileService.execute(authority, body);
    }
    updateOwnPassword(authority, body) {
        return this.updateAdminOwnPasswordService.execute(authority, body.currentPassword, body.newPassword);
    }
    delete(authority, id) {
        return this.deleteAdminService.execute(authority, id);
    }
};
exports.AdminController = AdminController;
__decorate([
    core_1.TypedRoute.Post('/sign-up', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return null !== input && undefined === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Post.guard;
                    return (null !== input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }, errorFactory)) && (undefined === input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }, errorFactory));
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            return undefined;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, filters_1.UseSignUpExceptionFilter)(),
    __param(0, (0, core_1.TypedBody)({ type: "assert", assert: (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.signInId && (1 <= input.signInId.length && input.signInId.length <= 50) && ("string" === typeof input.password && (1 <= input.password.length && input.password.length <= 50)) && ("string" === typeof input.name && input.name.length <= 20));
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.signInId && (1 <= input.signInId.length || $guard(_exceptionable, {
                        path: _path + ".signInId",
                        expected: "string & MinLength<1>",
                        value: input.signInId
                    }, errorFactory)) && (input.signInId.length <= 50 || $guard(_exceptionable, {
                        path: _path + ".signInId",
                        expected: "string & MaxLength<50>",
                        value: input.signInId
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".signInId",
                        expected: "(string & MinLength<1> & MaxLength<50>)",
                        value: input.signInId
                    }, errorFactory)) && ("string" === typeof input.password && (1 <= input.password.length || $guard(_exceptionable, {
                        path: _path + ".password",
                        expected: "string & MinLength<1>",
                        value: input.password
                    }, errorFactory)) && (input.password.length <= 50 || $guard(_exceptionable, {
                        path: _path + ".password",
                        expected: "string & MaxLength<50>",
                        value: input.password
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".password",
                        expected: "(string & MinLength<1> & MaxLength<50>)",
                        value: input.password
                    }, errorFactory)) && ("string" === typeof input.name && (input.name.length <= 20 || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string & MaxLength<20>",
                        value: input.name
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "(string & MaxLength<20>)",
                        value: input.name
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "SignUpRequestDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "SignUpRequestDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signUp", null);
__decorate([
    core_1.TypedRoute.Get('/', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "string" === typeof input.id && "string" === typeof input.name && input.joinedAt instanceof Date;
                return Array.isArray(input) && input.every(elem => "object" === typeof elem && null !== elem && $io0(elem));
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.id || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "string",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && (input.joinedAt instanceof Date || $guard(_exceptionable, {
                        path: _path + ".joinedAt",
                        expected: "Date",
                        value: input.joinedAt
                    }, errorFactory));
                    return (Array.isArray(input) || $guard(true, {
                        path: _path + "",
                        expected: "SearchResponseDto",
                        value: input
                    }, errorFactory)) && input.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao0(elem, _path + "[" + _index1 + "]", true) || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(true, {
                        path: _path + "",
                        expected: "SearchResponseDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"id":${$string(input.id)},"name":${$string(input.name)},"joinedAt":${$string(input.joinedAt.toJSON())}}`;
            return `[${input.map(elem => $so0(elem)).join(",")}]`;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, use_admin_guard_decorator_1.UseAdminGuard)(),
    __param(0, (0, core_1.TypedQuery)({ type: "assert", assert: (input, errorFactory) => { const decode = input => {
            const $params = core_1.TypedQuery.params;
            const $number = core_1.TypedQuery.number;
            input = $params(input);
            const output = {
                page: $number(input.get("page")),
                size: $number(input.get("size"))
            };
            return output;
        }; const assert = (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("number" === typeof input.page && 1 <= input.page && ("number" === typeof input.size && (1 <= input.size && input.size <= 30)));
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedQuery.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("number" === typeof input.page && (1 <= input.page || $guard(_exceptionable, {
                        path: _path + ".page",
                        expected: "number & Minimum<1>",
                        value: input.page
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".page",
                        expected: "(number & Minimum<1>)",
                        value: input.page
                    }, errorFactory)) && ("number" === typeof input.size && (1 <= input.size || $guard(_exceptionable, {
                        path: _path + ".size",
                        expected: "number & Minimum<1>",
                        value: input.size
                    }, errorFactory)) && (input.size <= 30 || $guard(_exceptionable, {
                        path: _path + ".size",
                        expected: "number & Maximum<30>",
                        value: input.size
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".size",
                        expected: "(number & Minimum<1> & Maximum<30>)",
                        value: input.size
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "SearchRequestDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "SearchRequestDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const output = decode(input); return assert(output, errorFactory); } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "search", null);
__decorate([
    core_1.TypedRoute.Get('/self', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "string" === typeof input.id && "string" === typeof input.signInId && "string" === typeof input.name && input.joinedAt instanceof Date;
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.id || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "string",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.signInId || $guard(_exceptionable, {
                        path: _path + ".signInId",
                        expected: "string",
                        value: input.signInId
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && (input.joinedAt instanceof Date || $guard(_exceptionable, {
                        path: _path + ".joinedAt",
                        expected: "Date",
                        value: input.joinedAt
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "ViewOwnProfileResponseDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "ViewOwnProfileResponseDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"id":${$string(input.id)},"signInId":${$string(input.signInId)},"name":${$string(input.name)},"joinedAt":${$string(input.joinedAt.toJSON())}}`;
            return $so0(input);
        }; return stringify(assert(input, errorFactory)); } }),
    (0, use_admin_guard_decorator_1.UseAdminGuard)(),
    (0, filters_1.UseViewOwnProfileExceptionFilter)(),
    __param(0, (0, current_admin_decorator_1.CurrentAdmin)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "viewOwnProfile", null);
__decorate([
    core_1.TypedRoute.Patch('/self', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return null !== input && undefined === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Patch.guard;
                    return (null !== input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }, errorFactory)) && (undefined === input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }, errorFactory));
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            return undefined;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, use_admin_guard_decorator_1.UseAdminGuard)(),
    (0, filters_1.UseUpdateOwnProfileExceptionFilter)(),
    __param(0, (0, current_admin_decorator_1.CurrentAdmin)()),
    __param(1, (0, core_1.TypedBody)({ type: "assert", assert: (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.name && input.name.length <= 20);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => "string" === typeof input.name && (input.name.length <= 20 || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string & MaxLength<20>",
                        value: input.name
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "(string & MaxLength<20>)",
                        value: input.name
                    }, errorFactory);
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "UpdateOwnProfileRequestDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "UpdateOwnProfileRequestDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOwnProfile", null);
__decorate([
    core_1.TypedRoute.Patch('/self/password', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return null !== input && undefined === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Patch.guard;
                    return (null !== input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }, errorFactory)) && (undefined === input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }, errorFactory));
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            return undefined;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, use_admin_guard_decorator_1.UseAdminGuard)(),
    (0, filters_1.UseUpdateOwnPasswordExceptionFilter)(),
    __param(0, (0, current_admin_decorator_1.CurrentAdmin)()),
    __param(1, (0, core_1.TypedBody)({ type: "assert", assert: (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.currentPassword && "string" === typeof input.newPassword);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.currentPassword || $guard(_exceptionable, {
                        path: _path + ".currentPassword",
                        expected: "string",
                        value: input.currentPassword
                    }, errorFactory)) && ("string" === typeof input.newPassword || $guard(_exceptionable, {
                        path: _path + ".newPassword",
                        expected: "string",
                        value: input.newPassword
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "UpdateOwnPasswordRequestDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "UpdateOwnPasswordRequestDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOwnPassword", null);
__decorate([
    core_1.TypedRoute.Delete('/:id', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return null !== input && undefined === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Delete.guard;
                    return (null !== input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }, errorFactory)) && (undefined === input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }, errorFactory));
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            return undefined;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, use_admin_guard_decorator_1.UseAdminGuard)(),
    (0, admin_permission_denied_exception_filter_1.UseAdminPermissionDeniedExceptionFilter)(),
    __param(0, (0, current_admin_decorator_1.CurrentAdmin)()),
    __param(1, (0, core_1.TypedParam)('id', input => {
        const $string = core_1.TypedParam.string;
        const assert = (input, errorFactory) => {
            const __is = input => {
                return "string" === typeof input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedParam.guard;
                    return "string" === typeof input || $guard(true, {
                        path: _path + "",
                        expected: "string",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        };
        const value = $string(input);
        return assert(value);
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "delete", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)({ path: 'admin', version: 'api' }),
    __metadata("design:paramtypes", [services_1.SignUpAdminService,
        services_1.SearchAdminsService,
        services_1.ViewAdminOwnProfileService,
        services_1.UpdateAdminOwnProfileService,
        services_1.UpdateAdminOwnPasswordService,
        services_1.DeleteAdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map