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
exports.CallStaffController = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const call_staff_service_1 = require("./call-staff.service");
const table_id_guard_1 = require("../auth/table-id.guard");
const table_id_decorator_1 = require("../auth/decorators/table-id.decorator");
let CallStaffController = class CallStaffController {
    callStaffService;
    constructor(callStaffService) {
        this.callStaffService = callStaffService;
    }
    getCallStaffOptions() {
        return this.callStaffService.getCallOptions();
    }
    callStaff(tableId, body) {
        return this.callStaffService.callStaff(tableId, body.options);
    }
};
exports.CallStaffController = CallStaffController;
__decorate([
    core_1.TypedRoute.Get('option', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "number" === typeof input.id && !Number.isNaN(input.id) && "string" === typeof input.title && "boolean" === typeof input.isCountable;
                return Array.isArray(input) && input.every(elem => "object" === typeof elem && null !== elem && $io0(elem));
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.title || $guard(_exceptionable, {
                        path: _path + ".title",
                        expected: "string",
                        value: input.title
                    }, errorFactory)) && ("boolean" === typeof input.isCountable || $guard(_exceptionable, {
                        path: _path + ".isCountable",
                        expected: "boolean",
                        value: input.isCountable
                    }, errorFactory));
                    return (Array.isArray(input) || $guard(true, {
                        path: _path + "",
                        expected: "GetCallStaffOptionsResponse",
                        value: input
                    }, errorFactory)) && input.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "CallOption",
                        value: elem
                    }, errorFactory)) && $ao0(elem, _path + "[" + _index1 + "]", true) || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "CallOption",
                        value: elem
                    }, errorFactory)) || $guard(true, {
                        path: _path + "",
                        expected: "GetCallStaffOptionsResponse",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Get.string;
            return `[${input.map(elem => `{"id":${elem.id},"title":${$string(elem.title)},"isCountable":${elem.isCountable}}`).join(",")}]`;
        }; return stringify(assert(input, errorFactory)); } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CallStaffController.prototype, "getCallStaffOptions", null);
__decorate([
    core_1.TypedRoute.Post({ type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return true === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Post.guard;
                    return true === input || $guard(true, {
                        path: _path + "",
                        expected: "true",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            return input.toString();
        }; return stringify(assert(input, errorFactory)); } }),
    (0, common_1.UseGuards)(table_id_guard_1.TableIdGuard),
    __param(0, (0, table_id_decorator_1.TableId)()),
    __param(1, (0, core_1.TypedBody)({ type: "assert", assert: (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => Array.isArray(input.options) && input.options.every(elem => "object" === typeof elem && null !== elem && $io1(elem));
                const $io1 = input => "number" === typeof input.id && (Math.floor(input.id) === input.id && -2147483648 <= input.id && input.id <= 2147483647) && ("string" === typeof input.title && input.title.length <= 100) && ("number" === typeof input.quantity && (Math.floor(input.quantity) === input.quantity && -2147483648 <= input.quantity && input.quantity <= 2147483647 && 1 <= input.quantity));
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => (Array.isArray(input.options) || $guard(_exceptionable, {
                        path: _path + ".options",
                        expected: "Array<__type>",
                        value: input.options
                    }, errorFactory)) && input.options.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".options[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".options[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".options[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".options",
                        expected: "Array<__type>",
                        value: input.options
                    }, errorFactory);
                    const $ao1 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && (Math.floor(input.id) === input.id && -2147483648 <= input.id && input.id <= 2147483647 || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number & Type<\"int32\">",
                        value: input.id
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "(number & Type<\"int32\">)",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.title && (input.title.length <= 100 || $guard(_exceptionable, {
                        path: _path + ".title",
                        expected: "string & MaxLength<100>",
                        value: input.title
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".title",
                        expected: "(string & MaxLength<100>)",
                        value: input.title
                    }, errorFactory)) && ("number" === typeof input.quantity && (Math.floor(input.quantity) === input.quantity && -2147483648 <= input.quantity && input.quantity <= 2147483647 || $guard(_exceptionable, {
                        path: _path + ".quantity",
                        expected: "number & Type<\"int32\">",
                        value: input.quantity
                    }, errorFactory)) && (1 <= input.quantity || $guard(_exceptionable, {
                        path: _path + ".quantity",
                        expected: "number & Minimum<1>",
                        value: input.quantity
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".quantity",
                        expected: "(number & Type<\"int32\"> & Minimum<1>)",
                        value: input.quantity
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "CallStaffBody",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "CallStaffBody",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CallStaffController.prototype, "callStaff", null);
exports.CallStaffController = CallStaffController = __decorate([
    (0, common_1.Controller)('call-staff'),
    __metadata("design:paramtypes", [call_staff_service_1.CallStaffService])
], CallStaffController);
//# sourceMappingURL=call-staff.controller.js.map