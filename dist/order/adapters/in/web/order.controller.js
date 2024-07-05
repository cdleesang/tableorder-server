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
exports.OrderController = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const admin_authority_1 = require("../../../../auth/domain/models/admin-authority");
const table_1 = require("../../../../auth/domain/models/table");
const current_admin_decorator_1 = require("../../../../auth/utils/decorators/current-admin.decorator");
const current_table_decorator_1 = require("../../../../auth/utils/decorators/current-table.decorator");
const use_admin_guard_decorator_1 = require("../../../../auth/utils/decorators/use-admin-guard.decorator");
const use_table_guard_decorator_1 = require("../../../../auth/utils/decorators/use-table-guard.decorator");
const admin_permission_denied_exception_filter_1 = require("../../../../auth/utils/filters/admin-permission-denied-exception.filter");
const view_all_order_histories_service_1 = require("../../../domain/services/view-all-order-histories.service");
const view_order_history_self_service_1 = require("../../../domain/services/view-order-history-self.service");
let OrderController = class OrderController {
    viewAllOrderHistoriesService;
    viewOrderHistorySelfService;
    constructor(viewAllOrderHistoriesService, viewOrderHistorySelfService) {
        this.viewAllOrderHistoriesService = viewAllOrderHistoriesService;
        this.viewOrderHistorySelfService = viewOrderHistorySelfService;
    }
    async getAllOrderHistories(authority) {
        return this.viewAllOrderHistoriesService.execute(authority);
    }
    async getOrderHistorySelf(authority) {
        return this.viewOrderHistorySelfService.execute(authority);
    }
};
exports.OrderController = OrderController;
__decorate([
    core_1.TypedRoute.Get('history', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "string" === typeof input.tableId && "string" === typeof input.tableName && ("number" === typeof input.totalPrice && !Number.isNaN(input.totalPrice)) && (Array.isArray(input.menus) && input.menus.every(elem => "object" === typeof elem && null !== elem && $io1(elem)));
                const $io1 = input => "string" === typeof input.name && ("number" === typeof input.price && !Number.isNaN(input.price)) && ("number" === typeof input.quantity && !Number.isNaN(input.quantity));
                return Array.isArray(input) && input.every(elem => "object" === typeof elem && null !== elem && $io0(elem));
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.tableId || $guard(_exceptionable, {
                        path: _path + ".tableId",
                        expected: "string",
                        value: input.tableId
                    }, errorFactory)) && ("string" === typeof input.tableName || $guard(_exceptionable, {
                        path: _path + ".tableName",
                        expected: "string",
                        value: input.tableName
                    }, errorFactory)) && ("number" === typeof input.totalPrice && !Number.isNaN(input.totalPrice) || $guard(_exceptionable, {
                        path: _path + ".totalPrice",
                        expected: "number",
                        value: input.totalPrice
                    }, errorFactory)) && ((Array.isArray(input.menus) || $guard(_exceptionable, {
                        path: _path + ".menus",
                        expected: "Array<__type>",
                        value: input.menus
                    }, errorFactory)) && input.menus.every((elem, _index2) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".menus[" + _index2 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".menus[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".menus[" + _index2 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".menus",
                        expected: "Array<__type>",
                        value: input.menus
                    }, errorFactory));
                    const $ao1 = (input, _path, _exceptionable = true) => ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ("number" === typeof input.price && !Number.isNaN(input.price) || $guard(_exceptionable, {
                        path: _path + ".price",
                        expected: "number",
                        value: input.price
                    }, errorFactory)) && ("number" === typeof input.quantity && !Number.isNaN(input.quantity) || $guard(_exceptionable, {
                        path: _path + ".quantity",
                        expected: "number",
                        value: input.quantity
                    }, errorFactory));
                    return (Array.isArray(input) || $guard(true, {
                        path: _path + "",
                        expected: "GetAllOrderHistoriesResponseDto",
                        value: input
                    }, errorFactory)) && input.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "OrderHistory",
                        value: elem
                    }, errorFactory)) && $ao0(elem, _path + "[" + _index1 + "]", true) || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "OrderHistory",
                        value: elem
                    }, errorFactory)) || $guard(true, {
                        path: _path + "",
                        expected: "GetAllOrderHistoriesResponseDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $io1 = input => "string" === typeof input.name && "number" === typeof input.price && "number" === typeof input.quantity;
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"tableId":${$string(input.tableId)},"tableName":${$string(input.tableName)},"totalPrice":${input.totalPrice},"menus":${`[${input.menus.map(elem => `{"name":${$string(elem.name)},"price":${elem.price},"quantity":${elem.quantity}}`).join(",")}]`}}`;
            return `[${input.map(elem => $so0(elem)).join(",")}]`;
        }; return stringify(assert(input, errorFactory)); } }),
    (0, use_admin_guard_decorator_1.UseAdminGuard)(),
    (0, admin_permission_denied_exception_filter_1.UseAdminPermissionDeniedExceptionFilter)(),
    __param(0, (0, current_admin_decorator_1.CurrentAdmin)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_authority_1.AdminAuthority]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrderHistories", null);
__decorate([
    core_1.TypedRoute.Get('history/self', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "number" === typeof input.totalPrice && !Number.isNaN(input.totalPrice) && (Array.isArray(input.menus) && input.menus.every(elem => "object" === typeof elem && null !== elem && $io1(elem)));
                const $io1 = input => "string" === typeof input.id && "string" === typeof input.name && ("number" === typeof input.price && !Number.isNaN(input.price)) && ("number" === typeof input.quantity && !Number.isNaN(input.quantity)) && input.orderedAt instanceof Date;
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("number" === typeof input.totalPrice && !Number.isNaN(input.totalPrice) || $guard(_exceptionable, {
                        path: _path + ".totalPrice",
                        expected: "number",
                        value: input.totalPrice
                    }, errorFactory)) && ((Array.isArray(input.menus) || $guard(_exceptionable, {
                        path: _path + ".menus",
                        expected: "Array<__type>",
                        value: input.menus
                    }, errorFactory)) && input.menus.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".menus[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".menus[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".menus[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".menus",
                        expected: "Array<__type>",
                        value: input.menus
                    }, errorFactory));
                    const $ao1 = (input, _path, _exceptionable = true) => ("string" === typeof input.id || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "string",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ("number" === typeof input.price && !Number.isNaN(input.price) || $guard(_exceptionable, {
                        path: _path + ".price",
                        expected: "number",
                        value: input.price
                    }, errorFactory)) && ("number" === typeof input.quantity && !Number.isNaN(input.quantity) || $guard(_exceptionable, {
                        path: _path + ".quantity",
                        expected: "number",
                        value: input.quantity
                    }, errorFactory)) && (input.orderedAt instanceof Date || $guard(_exceptionable, {
                        path: _path + ".orderedAt",
                        expected: "Date",
                        value: input.orderedAt
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "GetOrderHistorySelfResponseDto",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "GetOrderHistorySelfResponseDto",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $io1 = input => "string" === typeof input.id && "string" === typeof input.name && "number" === typeof input.price && "number" === typeof input.quantity && input.orderedAt instanceof Date;
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"totalPrice":${input.totalPrice},"menus":${`[${input.menus.map(elem => $so1(elem)).join(",")}]`}}`;
            const $so1 = input => `{"id":${$string(input.id)},"name":${$string(input.name)},"price":${input.price},"quantity":${input.quantity},"orderedAt":${$string(input.orderedAt.toJSON())}}`;
            return $so0(input);
        }; return stringify(assert(input, errorFactory)); } }),
    (0, use_table_guard_decorator_1.UseTableGuard)(),
    __param(0, (0, current_table_decorator_1.CurrentTable)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [table_1.Table]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderHistorySelf", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)({ path: 'order', version: 'api' }),
    __metadata("design:paramtypes", [view_all_order_histories_service_1.ViewAllOrderHistoriesService,
        view_order_history_self_service_1.ViewOrderHistorySelfService])
], OrderController);
//# sourceMappingURL=order.controller.js.map