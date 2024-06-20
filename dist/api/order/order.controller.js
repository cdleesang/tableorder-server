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
const table_id_decorator_1 = require("../auth/decorators/table-id.decorator");
const table_id_guard_1 = require("../auth/table-id.guard");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getAllOrderHistories(tableId, query) {
        return this.orderService.getAllOrderHistories(tableId, query.enteredAt);
    }
    async getOrderHistoriesByTableId(loggedInTableId, tableId) {
        return this.orderService.getOrderHistoriesByTableId(loggedInTableId, tableId);
    }
    async orderImmediately(tableId, body) {
        return this.orderService.orderImmediately(tableId, body);
    }
    async orderCart(tableId, body) {
        return this.orderService.order(tableId, body.cartItems);
    }
};
exports.OrderController = OrderController;
__decorate([
    core_1.TypedRoute.Get({ type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => Array.isArray(input.orderHistories) && input.orderHistories.every(elem => "object" === typeof elem && null !== elem && $io1(elem));
                const $io1 = input => "number" === typeof input.id && !Number.isNaN(input.id) && ("number" === typeof input.totalPrice && !Number.isNaN(input.totalPrice)) && input.createdAt instanceof Date && ("number" === typeof input.orderSeq && !Number.isNaN(input.orderSeq)) && (Array.isArray(input.menus) && input.menus.every(elem => "object" === typeof elem && null !== elem && $io2(elem)));
                const $io2 = input => "number" === typeof input.id && !Number.isNaN(input.id) && ("number" === typeof input.totalPrice && !Number.isNaN(input.totalPrice)) && ("number" === typeof input.amount && !Number.isNaN(input.amount)) && "string" === typeof input.name && "string" === typeof input.mainOptionName && (Array.isArray(input.subOptionGroups) && input.subOptionGroups.every(elem => "object" === typeof elem && null !== elem && $io3(elem)));
                const $io3 = input => "string" === typeof input.groupName && "string" === typeof input.optionName && ("number" === typeof input.optionPrice && !Number.isNaN(input.optionPrice));
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => (Array.isArray(input.orderHistories) || $guard(_exceptionable, {
                        path: _path + ".orderHistories",
                        expected: "Array<__type>",
                        value: input.orderHistories
                    }, errorFactory)) && input.orderHistories.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".orderHistories[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".orderHistories[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".orderHistories[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".orderHistories",
                        expected: "Array<__type>",
                        value: input.orderHistories
                    }, errorFactory);
                    const $ao1 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("number" === typeof input.totalPrice && !Number.isNaN(input.totalPrice) || $guard(_exceptionable, {
                        path: _path + ".totalPrice",
                        expected: "number",
                        value: input.totalPrice
                    }, errorFactory)) && (input.createdAt instanceof Date || $guard(_exceptionable, {
                        path: _path + ".createdAt",
                        expected: "Date",
                        value: input.createdAt
                    }, errorFactory)) && ("number" === typeof input.orderSeq && !Number.isNaN(input.orderSeq) || $guard(_exceptionable, {
                        path: _path + ".orderSeq",
                        expected: "number",
                        value: input.orderSeq
                    }, errorFactory)) && ((Array.isArray(input.menus) || $guard(_exceptionable, {
                        path: _path + ".menus",
                        expected: "Array<__type>.o1",
                        value: input.menus
                    }, errorFactory)) && input.menus.every((elem, _index2) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".menus[" + _index2 + "]",
                        expected: "__type.o1",
                        value: elem
                    }, errorFactory)) && $ao2(elem, _path + ".menus[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".menus[" + _index2 + "]",
                        expected: "__type.o1",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".menus",
                        expected: "Array<__type>.o1",
                        value: input.menus
                    }, errorFactory));
                    const $ao2 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("number" === typeof input.totalPrice && !Number.isNaN(input.totalPrice) || $guard(_exceptionable, {
                        path: _path + ".totalPrice",
                        expected: "number",
                        value: input.totalPrice
                    }, errorFactory)) && ("number" === typeof input.amount && !Number.isNaN(input.amount) || $guard(_exceptionable, {
                        path: _path + ".amount",
                        expected: "number",
                        value: input.amount
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ("string" === typeof input.mainOptionName || $guard(_exceptionable, {
                        path: _path + ".mainOptionName",
                        expected: "string",
                        value: input.mainOptionName
                    }, errorFactory)) && ((Array.isArray(input.subOptionGroups) || $guard(_exceptionable, {
                        path: _path + ".subOptionGroups",
                        expected: "Array<__type>.o2",
                        value: input.subOptionGroups
                    }, errorFactory)) && input.subOptionGroups.every((elem, _index3) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".subOptionGroups[" + _index3 + "]",
                        expected: "__type.o2",
                        value: elem
                    }, errorFactory)) && $ao3(elem, _path + ".subOptionGroups[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".subOptionGroups[" + _index3 + "]",
                        expected: "__type.o2",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".subOptionGroups",
                        expected: "Array<__type>.o2",
                        value: input.subOptionGroups
                    }, errorFactory));
                    const $ao3 = (input, _path, _exceptionable = true) => ("string" === typeof input.groupName || $guard(_exceptionable, {
                        path: _path + ".groupName",
                        expected: "string",
                        value: input.groupName
                    }, errorFactory)) && ("string" === typeof input.optionName || $guard(_exceptionable, {
                        path: _path + ".optionName",
                        expected: "string",
                        value: input.optionName
                    }, errorFactory)) && ("number" === typeof input.optionPrice && !Number.isNaN(input.optionPrice) || $guard(_exceptionable, {
                        path: _path + ".optionPrice",
                        expected: "number",
                        value: input.optionPrice
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "GetAllOrderHistoriesResponse",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "GetAllOrderHistoriesResponse",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $io1 = input => "number" === typeof input.id && "number" === typeof input.totalPrice && input.createdAt instanceof Date && "number" === typeof input.orderSeq && (Array.isArray(input.menus) && input.menus.every(elem => "object" === typeof elem && null !== elem && $io2(elem)));
            const $io2 = input => "number" === typeof input.id && "number" === typeof input.totalPrice && "number" === typeof input.amount && "string" === typeof input.name && "string" === typeof input.mainOptionName && (Array.isArray(input.subOptionGroups) && input.subOptionGroups.every(elem => "object" === typeof elem && null !== elem && $io3(elem)));
            const $io3 = input => "string" === typeof input.groupName && "string" === typeof input.optionName && "number" === typeof input.optionPrice;
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"orderHistories":${`[${input.orderHistories.map(elem => $so1(elem)).join(",")}]`}}`;
            const $so1 = input => `{"id":${input.id},"totalPrice":${input.totalPrice},"createdAt":${$string(input.createdAt.toJSON())},"orderSeq":${input.orderSeq},"menus":${`[${input.menus.map(elem => $so2(elem)).join(",")}]`}}`;
            const $so2 = input => `{"id":${input.id},"totalPrice":${input.totalPrice},"amount":${input.amount},"name":${$string(input.name)},"mainOptionName":${$string(input.mainOptionName)},"subOptionGroups":${`[${input.subOptionGroups.map(elem => `{"groupName":${$string(elem.groupName)},"optionName":${$string(elem.optionName)},"optionPrice":${elem.optionPrice}}`).join(",")}]`}}`;
            return $so0(input);
        }; return stringify(assert(input, errorFactory)); } }),
    (0, common_1.UseGuards)(table_id_guard_1.TableIdGuard),
    __param(0, (0, table_id_decorator_1.TableId)()),
    __param(1, (0, core_1.TypedQuery)({ type: "assert", assert: (input, errorFactory) => { const decode = input => {
            const $params = core_1.TypedQuery.params;
            const $string = core_1.TypedQuery.string;
            input = $params(input);
            const output = {
                enteredAt: $string(input.get("enteredAt"))
            };
            return output;
        }; const assert = (input, errorFactory) => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.enteredAt && !isNaN(new Date(input.enteredAt).getTime()));
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedQuery.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => "string" === typeof input.enteredAt && (!isNaN(new Date(input.enteredAt).getTime()) || $guard(_exceptionable, {
                        path: _path + ".enteredAt",
                        expected: "string & Format<\"date-time\">",
                        value: input.enteredAt
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".enteredAt",
                        expected: "(string & Format<\"date-time\">)",
                        value: input.enteredAt
                    }, errorFactory);
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "GetAllOrderHistoriesQuery",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "GetAllOrderHistoriesQuery",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const output = decode(input); return assert(output, errorFactory); } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrderHistories", null);
__decorate([
    core_1.TypedRoute.Get(':tableId', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => Array.isArray(input.orderHistories) && input.orderHistories.every(elem => "object" === typeof elem && null !== elem && $io1(elem));
                const $io1 = input => "string" === typeof input.stockName && ("number" === typeof input.amount && !Number.isNaN(input.amount)) && ("number" === typeof input.quantity && !Number.isNaN(input.quantity)) && input.orderTime instanceof Date;
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => (Array.isArray(input.orderHistories) || $guard(_exceptionable, {
                        path: _path + ".orderHistories",
                        expected: "Array<__type>",
                        value: input.orderHistories
                    }, errorFactory)) && input.orderHistories.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".orderHistories[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".orderHistories[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".orderHistories[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".orderHistories",
                        expected: "Array<__type>",
                        value: input.orderHistories
                    }, errorFactory);
                    const $ao1 = (input, _path, _exceptionable = true) => ("string" === typeof input.stockName || $guard(_exceptionable, {
                        path: _path + ".stockName",
                        expected: "string",
                        value: input.stockName
                    }, errorFactory)) && ("number" === typeof input.amount && !Number.isNaN(input.amount) || $guard(_exceptionable, {
                        path: _path + ".amount",
                        expected: "number",
                        value: input.amount
                    }, errorFactory)) && ("number" === typeof input.quantity && !Number.isNaN(input.quantity) || $guard(_exceptionable, {
                        path: _path + ".quantity",
                        expected: "number",
                        value: input.quantity
                    }, errorFactory)) && (input.orderTime instanceof Date || $guard(_exceptionable, {
                        path: _path + ".orderTime",
                        expected: "Date",
                        value: input.orderTime
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "GetOrderHistoriesByTableId",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "GetOrderHistoriesByTableId",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $io1 = input => "string" === typeof input.stockName && "number" === typeof input.amount && "number" === typeof input.quantity && input.orderTime instanceof Date;
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"orderHistories":${`[${input.orderHistories.map(elem => $so1(elem)).join(",")}]`}}`;
            const $so1 = input => `{"stockName":${$string(input.stockName)},"amount":${input.amount},"quantity":${input.quantity},"orderTime":${$string(input.orderTime.toJSON())}}`;
            return $so0(input);
        }; return stringify(assert(input, errorFactory)); } }),
    (0, core_1.TypedException)(403, '요청한 테이블 번호와 로그인한 테이블 번호가 일치하지 않음', "ForbiddenException"),
    (0, common_1.UseGuards)(table_id_guard_1.TableIdGuard),
    __param(0, (0, table_id_decorator_1.TableId)()),
    __param(1, (0, core_1.TypedParam)('tableId', input => {
        const $number = core_1.TypedParam.number;
        const assert = (input, errorFactory) => {
            const __is = input => {
                return "number" === typeof input && !Number.isNaN(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedParam.guard;
                    return "number" === typeof input && !Number.isNaN(input) || $guard(true, {
                        path: _path + "",
                        expected: "number",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        };
        const value = $number(input);
        return assert(value);
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderHistoriesByTableId", null);
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
                const $io0 = input => "number" === typeof input.menuId && "number" === typeof input.menuMainOptionId && "number" === typeof input.amount && "number" === typeof input.totalPrice && (Array.isArray(input.menuSubOptions) && input.menuSubOptions.every(elem => "object" === typeof elem && null !== elem && $io1(elem)));
                const $io1 = input => "number" === typeof input.optionGroupId && "number" === typeof input.optionId;
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("number" === typeof input.menuId || $guard(_exceptionable, {
                        path: _path + ".menuId",
                        expected: "number",
                        value: input.menuId
                    }, errorFactory)) && ("number" === typeof input.menuMainOptionId || $guard(_exceptionable, {
                        path: _path + ".menuMainOptionId",
                        expected: "number",
                        value: input.menuMainOptionId
                    }, errorFactory)) && ("number" === typeof input.amount || $guard(_exceptionable, {
                        path: _path + ".amount",
                        expected: "number",
                        value: input.amount
                    }, errorFactory)) && ("number" === typeof input.totalPrice || $guard(_exceptionable, {
                        path: _path + ".totalPrice",
                        expected: "number",
                        value: input.totalPrice
                    }, errorFactory)) && ((Array.isArray(input.menuSubOptions) || $guard(_exceptionable, {
                        path: _path + ".menuSubOptions",
                        expected: "Array<__type>",
                        value: input.menuSubOptions
                    }, errorFactory)) && input.menuSubOptions.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".menuSubOptions[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".menuSubOptions[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".menuSubOptions[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".menuSubOptions",
                        expected: "Array<__type>",
                        value: input.menuSubOptions
                    }, errorFactory));
                    const $ao1 = (input, _path, _exceptionable = true) => ("number" === typeof input.optionGroupId || $guard(_exceptionable, {
                        path: _path + ".optionGroupId",
                        expected: "number",
                        value: input.optionGroupId
                    }, errorFactory)) && ("number" === typeof input.optionId || $guard(_exceptionable, {
                        path: _path + ".optionId",
                        expected: "number",
                        value: input.optionId
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "OrderImmediatelyBody",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "OrderImmediatelyBody",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderImmediately", null);
__decorate([
    core_1.TypedRoute.Post('cart', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
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
                const $io0 = input => Array.isArray(input.cartItems) && input.cartItems.every(elem => "object" === typeof elem && null !== elem && $io1(elem));
                const $io1 = input => "number" === typeof input.id && "number" === typeof input.amount && "number" === typeof input.price;
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => (Array.isArray(input.cartItems) || $guard(_exceptionable, {
                        path: _path + ".cartItems",
                        expected: "Array<__type>",
                        value: input.cartItems
                    }, errorFactory)) && input.cartItems.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".cartItems[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".cartItems[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".cartItems[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".cartItems",
                        expected: "Array<__type>",
                        value: input.cartItems
                    }, errorFactory);
                    const $ao1 = (input, _path, _exceptionable = true) => ("number" === typeof input.id || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("number" === typeof input.amount || $guard(_exceptionable, {
                        path: _path + ".amount",
                        expected: "number",
                        value: input.amount
                    }, errorFactory)) && ("number" === typeof input.price || $guard(_exceptionable, {
                        path: _path + ".price",
                        expected: "number",
                        value: input.price
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "OrderCartBody",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "OrderCartBody",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderCart", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map