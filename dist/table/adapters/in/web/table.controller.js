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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableController = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const use_admin_guard_decorator_1 = require("../../../../auth/utils/decorators/use-admin-guard.decorator");
const table_service_1 = require("../../../domain/services/table.service");
let TableController = class TableController {
    tableService;
    constructor(tableService) {
        this.tableService = tableService;
    }
    async viewAllTables() {
        return this.tableService.viewAllTables();
    }
};
exports.TableController = TableController;
__decorate([
    core_1.TypedRoute.Get('/', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "string" === typeof input.id && "string" === typeof input.name;
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
                    }, errorFactory));
                    return (Array.isArray(input) || $guard(true, {
                        path: _path + "",
                        expected: "ViewAllTablesResponseDto",
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
                        expected: "ViewAllTablesResponseDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Get.string;
            return `[${input.map(elem => `{"id":${$string(elem.id)},"name":${$string(elem.name)}}`).join(",")}]`;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, use_admin_guard_decorator_1.UseAdminGuard)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TableController.prototype, "viewAllTables", null);
exports.TableController = TableController = __decorate([
    (0, common_1.Controller)({ path: 'table', version: 'api' }),
    __metadata("design:paramtypes", [table_service_1.TableService])
], TableController);
//# sourceMappingURL=table.controller.js.map