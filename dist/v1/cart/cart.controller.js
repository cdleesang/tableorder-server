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
exports.CartController = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const table_id_decorator_1 = require("../auth/decorators/table-id.decorator");
const table_id_guard_1 = require("../auth/table-id.guard");
const cart_service_1 = require("./cart.service");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getAllCartItems(tableId) {
        return this.cartService.getAllCartItems(tableId);
    }
    async addItem(tableId, body) {
        return this.cartService.addItem(tableId, {
            ...body,
            id: body.menuId,
            mainOptionId: body.menuMainOptionId,
            subOptions: body.menuSubOptions,
        });
    }
    async deleteItemById(tableId, itemId) {
        return this.cartService.deleteItemById(tableId, itemId);
    }
    async clearCart(tableId) {
        return this.cartService.clearCart(tableId);
    }
};
exports.CartController = CartController;
__decorate([
    core_1.TypedRoute.Get({ type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => Array.isArray(input.cartItems) && input.cartItems.every(elem => "object" === typeof elem && null !== elem && $io1(elem));
                const $io1 = input => "number" === typeof input.id && !Number.isNaN(input.id) && ("number" === typeof input.menuId && !Number.isNaN(input.menuId)) && "string" === typeof input.menuName && ("number" === typeof input.menuAmount && !Number.isNaN(input.menuAmount)) && ("number" === typeof input.menuTotalPrice && !Number.isNaN(input.menuTotalPrice)) && ("string" === typeof input.imageUrl && /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(input.imageUrl)) && ("object" === typeof input.menuMainOption && null !== input.menuMainOption && ("number" === typeof input.menuMainOption.id && !Number.isNaN(input.menuMainOption.id) && ("number" === typeof input.menuMainOption.price && !Number.isNaN(input.menuMainOption.price)) && "string" === typeof input.menuMainOption.name)) && (Array.isArray(input.menuSubOptions) && input.menuSubOptions.every(elem => "object" === typeof elem && null !== elem && $io3(elem)));
                const $io3 = input => "number" === typeof input.groupId && !Number.isNaN(input.groupId) && "string" === typeof input.groupName && ("number" === typeof input.optionId && !Number.isNaN(input.optionId)) && "string" === typeof input.optionName && ("number" === typeof input.optionPrice && !Number.isNaN(input.optionPrice));
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => (Array.isArray(input.cartItems) || $guard(_exceptionable, {
                        path: _path + ".cartItems",
                        expected: "Array<CartItem>",
                        value: input.cartItems
                    }, errorFactory)) && input.cartItems.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".cartItems[" + _index1 + "]",
                        expected: "CartItem",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".cartItems[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".cartItems[" + _index1 + "]",
                        expected: "CartItem",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".cartItems",
                        expected: "Array<CartItem>",
                        value: input.cartItems
                    }, errorFactory);
                    const $ao1 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("number" === typeof input.menuId && !Number.isNaN(input.menuId) || $guard(_exceptionable, {
                        path: _path + ".menuId",
                        expected: "number",
                        value: input.menuId
                    }, errorFactory)) && ("string" === typeof input.menuName || $guard(_exceptionable, {
                        path: _path + ".menuName",
                        expected: "string",
                        value: input.menuName
                    }, errorFactory)) && ("number" === typeof input.menuAmount && !Number.isNaN(input.menuAmount) || $guard(_exceptionable, {
                        path: _path + ".menuAmount",
                        expected: "number",
                        value: input.menuAmount
                    }, errorFactory)) && ("number" === typeof input.menuTotalPrice && !Number.isNaN(input.menuTotalPrice) || $guard(_exceptionable, {
                        path: _path + ".menuTotalPrice",
                        expected: "number",
                        value: input.menuTotalPrice
                    }, errorFactory)) && ("string" === typeof input.imageUrl && (/^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(input.imageUrl) || $guard(_exceptionable, {
                        path: _path + ".imageUrl",
                        expected: "string & Format<\"url\">",
                        value: input.imageUrl
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".imageUrl",
                        expected: "(string & Format<\"url\">)",
                        value: input.imageUrl
                    }, errorFactory)) && (("object" === typeof input.menuMainOption && null !== input.menuMainOption || $guard(_exceptionable, {
                        path: _path + ".menuMainOption",
                        expected: "__type",
                        value: input.menuMainOption
                    }, errorFactory)) && $ao2(input.menuMainOption, _path + ".menuMainOption", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".menuMainOption",
                        expected: "__type",
                        value: input.menuMainOption
                    }, errorFactory)) && ((Array.isArray(input.menuSubOptions) || $guard(_exceptionable, {
                        path: _path + ".menuSubOptions",
                        expected: "Array<__type>",
                        value: input.menuSubOptions
                    }, errorFactory)) && input.menuSubOptions.every((elem, _index2) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".menuSubOptions[" + _index2 + "]",
                        expected: "__type.o1",
                        value: elem
                    }, errorFactory)) && $ao3(elem, _path + ".menuSubOptions[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".menuSubOptions[" + _index2 + "]",
                        expected: "__type.o1",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".menuSubOptions",
                        expected: "Array<__type>",
                        value: input.menuSubOptions
                    }, errorFactory));
                    const $ao2 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("number" === typeof input.price && !Number.isNaN(input.price) || $guard(_exceptionable, {
                        path: _path + ".price",
                        expected: "number",
                        value: input.price
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory));
                    const $ao3 = (input, _path, _exceptionable = true) => ("number" === typeof input.groupId && !Number.isNaN(input.groupId) || $guard(_exceptionable, {
                        path: _path + ".groupId",
                        expected: "number",
                        value: input.groupId
                    }, errorFactory)) && ("string" === typeof input.groupName || $guard(_exceptionable, {
                        path: _path + ".groupName",
                        expected: "string",
                        value: input.groupName
                    }, errorFactory)) && ("number" === typeof input.optionId && !Number.isNaN(input.optionId) || $guard(_exceptionable, {
                        path: _path + ".optionId",
                        expected: "number",
                        value: input.optionId
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
                        expected: "GetAllCartItems",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "GetAllCartItems",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $io1 = input => "number" === typeof input.id && "number" === typeof input.menuId && "string" === typeof input.menuName && "number" === typeof input.menuAmount && "number" === typeof input.menuTotalPrice && ("string" === typeof input.imageUrl && /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(input.imageUrl)) && ("object" === typeof input.menuMainOption && null !== input.menuMainOption && $io2(input.menuMainOption)) && (Array.isArray(input.menuSubOptions) && input.menuSubOptions.every(elem => "object" === typeof elem && null !== elem && $io3(elem)));
            const $io2 = input => "number" === typeof input.id && "number" === typeof input.price && "string" === typeof input.name;
            const $io3 = input => "number" === typeof input.groupId && "string" === typeof input.groupName && "number" === typeof input.optionId && "string" === typeof input.optionName && "number" === typeof input.optionPrice;
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"cartItems":${`[${input.cartItems.map(elem => $so1(elem)).join(",")}]`}}`;
            const $so1 = input => `{"id":${input.id},"menuId":${input.menuId},"menuName":${$string(input.menuName)},"menuAmount":${input.menuAmount},"menuTotalPrice":${input.menuTotalPrice},"imageUrl":${$string(input.imageUrl)},"menuMainOption":${`{"id":${input.menuMainOption.id},"price":${input.menuMainOption.price},"name":${$string(input.menuMainOption.name)}}`},"menuSubOptions":${`[${input.menuSubOptions.map(elem => `{"groupId":${elem.groupId},"groupName":${$string(elem.groupName)},"optionId":${elem.optionId},"optionName":${$string(elem.optionName)},"optionPrice":${elem.optionPrice}}`).join(",")}]`}}`;
            return $so0(input);
        }; return stringify(assert(input, errorFactory)); } }),
    (0, common_1.UseGuards)(table_id_guard_1.TableIdGuard),
    __param(0, (0, table_id_decorator_1.TableId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getAllCartItems", null);
__decorate([
    core_1.TypedRoute.Post({ type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return "number" === typeof input && !Number.isNaN(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Post.guard;
                    return "number" === typeof input && !Number.isNaN(input) || $guard(true, {
                        path: _path + "",
                        expected: "number",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            return input.toString();
        }; return stringify(assert(input, errorFactory)); } }),
    (0, core_1.TypedException)(409, '상품을 더이상 추가할 수 없음', "ConflictException"),
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
                        expected: "AddCartItemBody",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "AddCartItemBody",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItem", null);
__decorate([
    core_1.TypedRoute.Delete(':itemId', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return true === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Delete.guard;
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
    __param(1, (0, core_1.TypedParam)('itemId', input => {
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
], CartController.prototype, "deleteItemById", null);
__decorate([
    core_1.TypedRoute.Delete({ type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                return true === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Delete.guard;
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)({ path: 'cart', version: common_1.VERSION_NEUTRAL }),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map