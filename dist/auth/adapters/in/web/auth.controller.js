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
exports.AuthController = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const admin_authority_1 = require("../../../domain/models/admin-authority");
const services_1 = require("../../../domain/services");
const utils_1 = require("../../../utils");
const filters_1 = require("./filters");
const admin_sign_out_exception_filter_1 = require("./filters/admin-sign-out-exception.filter");
let AuthController = class AuthController {
    adminSignInService;
    renewTokenService;
    adminSignOutService;
    adminSignOutAllService;
    viewAdminPermissionsService;
    updateAdminPermissionsService;
    tableParingService;
    constructor(adminSignInService, renewTokenService, adminSignOutService, adminSignOutAllService, viewAdminPermissionsService, updateAdminPermissionsService, tableParingService) {
        this.adminSignInService = adminSignInService;
        this.renewTokenService = renewTokenService;
        this.adminSignOutService = adminSignOutService;
        this.adminSignOutAllService = adminSignOutAllService;
        this.viewAdminPermissionsService = viewAdminPermissionsService;
        this.updateAdminPermissionsService = updateAdminPermissionsService;
        this.tableParingService = tableParingService;
    }
    adminSignIn(body) {
        return this.adminSignInService.execute(body.signInId, body.password);
    }
    adminRenewToken(query) {
        return this.renewTokenService.execute(query.refreshToken);
    }
    adminSignOut(authority, body) {
        return this.adminSignOutService.execute(authority, body.refreshToken);
    }
    adminSignOutAll(authority) {
        return this.adminSignOutAllService.execute(authority);
    }
    viewAdminPermissions(id) {
        return this.viewAdminPermissionsService.execute(id);
    }
    updateAdminPermissions(authority, id, body) {
        return this.updateAdminPermissionsService.execute(authority, id, body.permissions);
    }
    generateTablePairingCode(authority, id) {
        return this.tableParingService.generateParingCode(authority, id);
    }
    paringTable(body) {
        return this.tableParingService.paring(body.paringCode);
    }
};
exports.AuthController = AuthController;
__decorate([
    core_1.TypedRoute.Post('/admin/sign-in', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.accessToken && "string" === typeof input.refreshToken);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Post.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.accessToken || $guard(_exceptionable, {
                        path: _path + ".accessToken",
                        expected: "string",
                        value: input.accessToken
                    }, errorFactory)) && ("string" === typeof input.refreshToken || $guard(_exceptionable, {
                        path: _path + ".refreshToken",
                        expected: "string",
                        value: input.refreshToken
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "AdminSignInResponseDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "AdminSignInResponseDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Post.string;
            return `{"accessToken":${$string(input.accessToken)},"refreshToken":${$string(input.refreshToken)}}`;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, filters_1.UseAdminSignInExceptionFilter)(),
    __param(0, (0, core_1.TypedBody)({ type: "assert", assert: (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.signInId && "string" === typeof input.password);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.signInId || $guard(_exceptionable, {
                        path: _path + ".signInId",
                        expected: "string",
                        value: input.signInId
                    }, errorFactory)) && ("string" === typeof input.password || $guard(_exceptionable, {
                        path: _path + ".password",
                        expected: "string",
                        value: input.password
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "AdminSignInRequestDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "AdminSignInRequestDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSignIn", null);
__decorate([
    core_1.TypedRoute.Post('/admin/renew-token', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.accessToken && "string" === typeof input.refreshToken);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Post.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.accessToken || $guard(_exceptionable, {
                        path: _path + ".accessToken",
                        expected: "string",
                        value: input.accessToken
                    }, errorFactory)) && ("string" === typeof input.refreshToken || $guard(_exceptionable, {
                        path: _path + ".refreshToken",
                        expected: "string",
                        value: input.refreshToken
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "RenewTokenResponseDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "RenewTokenResponseDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Post.string;
            return `{"accessToken":${$string(input.accessToken)},"refreshToken":${$string(input.refreshToken)}}`;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, filters_1.UseAdminRenewTokenExceptionFilter)(),
    __param(0, (0, core_1.TypedQuery)({ type: "assert", assert: (input, errorFactory) => { const decode = input => {
            const $params = core_1.TypedQuery.params;
            const $string = core_1.TypedQuery.string;
            input = $params(input);
            const output = {
                refreshToken: $string(input.get("refreshToken"))
            };
            return output;
        }; const assert = (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && "string" === typeof input.refreshToken;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedQuery.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => "string" === typeof input.refreshToken || $guard(_exceptionable, {
                        path: _path + ".refreshToken",
                        expected: "string",
                        value: input.refreshToken
                    }, errorFactory);
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "RenewTokenRequestDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "RenewTokenRequestDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const output = decode(input); return assert(output, errorFactory); } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminRenewToken", null);
__decorate([
    core_1.TypedRoute.Post('/admin/sign-out', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
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
    (0, utils_1.UseAdminGuard)(),
    (0, admin_sign_out_exception_filter_1.UseAdminSignOutExceptionFilter)(),
    __param(0, (0, utils_1.CurrentAdmin)()),
    __param(1, (0, core_1.TypedBody)({ type: "assert", assert: (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && "string" === typeof input.refreshToken;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => "string" === typeof input.refreshToken || $guard(_exceptionable, {
                        path: _path + ".refreshToken",
                        expected: "string",
                        value: input.refreshToken
                    }, errorFactory);
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "AdminSignOutRequestDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "AdminSignOutRequestDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_authority_1.AdminAuthority, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSignOut", null);
__decorate([
    core_1.TypedRoute.Post('/admin/sign-out/all', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
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
    (0, utils_1.UseAdminGuard)(),
    __param(0, (0, utils_1.CurrentAdmin)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_authority_1.AdminAuthority]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSignOutAll", null);
__decorate([
    core_1.TypedRoute.Get('/admin/:id/permissions', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return Array.isArray(input) && input.every(elem => "manage_admin_permission" === elem || "delete_admin" === elem || "view_order" === elem || "paring_table" === elem);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    return (Array.isArray(input) || $guard(true, {
                        path: _path + "",
                        expected: "Array<AdminPermission>",
                        value: input
                    }, errorFactory)) && input.every((elem, _index1) => "manage_admin_permission" === elem || "delete_admin" === elem || "view_order" === elem || "paring_table" === elem || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "(\"delete_admin\" | \"manage_admin_permission\" | \"paring_table\" | \"view_order\")",
                        value: elem
                    }, errorFactory)) || $guard(true, {
                        path: _path + "",
                        expected: "Array<AdminPermission>",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Get.string;
            const $throws = core_1.TypedRoute.Get.throws;
            return `[${input.map(elem => (() => {
                if ("string" === typeof elem)
                    return $string(elem);
                if ("string" === typeof elem)
                    return "\"" + elem + "\"";
                $throws({
                    expected: "(\"delete_admin\" | \"manage_admin_permission\" | \"paring_table\" | \"view_order\")",
                    value: elem
                });
            })()).join(",")}]`;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, utils_1.UseAdminGuard)(),
    __param(0, (0, core_1.TypedParam)('id', input => {
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
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "viewAdminPermissions", null);
__decorate([
    core_1.TypedRoute.Put('/admin/:id/permissions', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return null !== input && undefined === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Put.guard;
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
    (0, utils_1.UseAdminGuard)(),
    (0, filters_1.UseUpdateAdminPermissionsExceptionFilter)(),
    (0, utils_1.UseAdminPermissionDeniedExceptionFilter)(),
    __param(0, (0, utils_1.CurrentAdmin)()),
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
    __param(2, (0, core_1.TypedBody)({ type: "assert", assert: (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => Array.isArray(input.permissions) && input.permissions.every(elem => "manage_admin_permission" === elem || "delete_admin" === elem || "view_order" === elem || "paring_table" === elem);
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => (Array.isArray(input.permissions) || $guard(_exceptionable, {
                        path: _path + ".permissions",
                        expected: "Array<AdminPermission>",
                        value: input.permissions
                    }, errorFactory)) && input.permissions.every((elem, _index1) => "manage_admin_permission" === elem || "delete_admin" === elem || "view_order" === elem || "paring_table" === elem || $guard(_exceptionable, {
                        path: _path + ".permissions[" + _index1 + "]",
                        expected: "(\"delete_admin\" | \"manage_admin_permission\" | \"paring_table\" | \"view_order\")",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".permissions",
                        expected: "Array<AdminPermission>",
                        value: input.permissions
                    }, errorFactory);
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "UpdateAdminPermissionsRequestDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "UpdateAdminPermissionsRequestDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_authority_1.AdminAuthority, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateAdminPermissions", null);
__decorate([
    core_1.TypedRoute.Post('/table/:id/pairing-code', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return "string" === typeof input && (6 <= input.length && input.length <= 6);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Post.guard;
                    return "string" === typeof input && (6 <= input.length || $guard(true, {
                        path: _path + "",
                        expected: "string & MinLength<6>",
                        value: input
                    }, errorFactory)) && (input.length <= 6 || $guard(true, {
                        path: _path + "",
                        expected: "string & MaxLength<6>",
                        value: input
                    }, errorFactory)) || $guard(true, {
                        path: _path + "",
                        expected: "(string & MinLength<6> & MaxLength<6>)",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Post.string;
            return $string(input);
        }; return stringify(assert(input, errorFactory)); } }),
    (0, utils_1.UseAdminGuard)(),
    (0, utils_1.UseAdminPermissionDeniedExceptionFilter)(),
    __param(0, (0, utils_1.CurrentAdmin)()),
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
    __metadata("design:paramtypes", [admin_authority_1.AdminAuthority, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateTablePairingCode", null);
__decorate([
    core_1.TypedRoute.Post('/table/pairing', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return "string" === typeof input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Post.guard;
                    return "string" === typeof input || $guard(true, {
                        path: _path + "",
                        expected: "string",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Post.string;
            return $string(input);
        }; return stringify(assert(input, errorFactory)); } }),
    (0, filters_1.UseParingTableExceptionFilter)(),
    __param(0, (0, core_1.TypedBody)({ type: "assert", assert: (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.paringCode && (6 <= input.paringCode.length && input.paringCode.length <= 6));
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => "string" === typeof input.paringCode && (6 <= input.paringCode.length || $guard(_exceptionable, {
                        path: _path + ".paringCode",
                        expected: "string & MinLength<6>",
                        value: input.paringCode
                    }, errorFactory)) && (input.paringCode.length <= 6 || $guard(_exceptionable, {
                        path: _path + ".paringCode",
                        expected: "string & MaxLength<6>",
                        value: input.paringCode
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".paringCode",
                        expected: "(string & MinLength<6> & MaxLength<6>)",
                        value: input.paringCode
                    }, errorFactory);
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "__type",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "__type",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "paringTable", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)({ path: 'auth', version: 'api' }),
    __metadata("design:paramtypes", [services_1.AdminSignInService,
        services_1.AdminRenewTokenService,
        services_1.AdminSignOutService,
        services_1.AdminSignOutAllService,
        services_1.ViewAdminPermissionsService,
        services_1.UpdateAdminPermissionsService,
        services_1.TableParingService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map