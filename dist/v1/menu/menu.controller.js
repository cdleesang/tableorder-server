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
exports.MenuController = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
let MenuController = class MenuController {
    menuService;
    constructor(menuService) {
        this.menuService = menuService;
    }
    async getMenuCategories() {
        return this.menuService.getMenuCategories();
    }
    async getPaginatedMenusByCategory(query) {
        return this.menuService.getPaginatedMenusByCategory(query.page, query.categoryId, query.subCategoryId);
    }
    async getMenuDetailById(menuId) {
        return this.menuService.getMenuDetailById(menuId);
    }
};
exports.MenuController = MenuController;
__decorate([
    core_1.TypedRoute.Get('category', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "number" === typeof input.id && !Number.isNaN(input.id) && "string" === typeof input.name && (Array.isArray(input.subCategories) && input.subCategories.every(elem => "object" === typeof elem && null !== elem && $io1(elem)));
                const $io1 = input => "number" === typeof input.id && !Number.isNaN(input.id) && "string" === typeof input.name;
                return Array.isArray(input) && input.every(elem => "object" === typeof elem && null !== elem && $io0(elem));
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ((Array.isArray(input.subCategories) || $guard(_exceptionable, {
                        path: _path + ".subCategories",
                        expected: "Array<__type>",
                        value: input.subCategories
                    }, errorFactory)) && input.subCategories.every((elem, _index2) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".subCategories[" + _index2 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".subCategories[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".subCategories[" + _index2 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".subCategories",
                        expected: "Array<__type>",
                        value: input.subCategories
                    }, errorFactory));
                    const $ao1 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory));
                    return (Array.isArray(input) || $guard(true, {
                        path: _path + "",
                        expected: "GetMenuCategoriesResponse",
                        value: input
                    }, errorFactory)) && input.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "MenuCategory",
                        value: elem
                    }, errorFactory)) && $ao0(elem, _path + "[" + _index1 + "]", true) || $guard(true, {
                        path: _path + "[" + _index1 + "]",
                        expected: "MenuCategory",
                        value: elem
                    }, errorFactory)) || $guard(true, {
                        path: _path + "",
                        expected: "GetMenuCategoriesResponse",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $io1 = input => "number" === typeof input.id && "string" === typeof input.name;
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"id":${input.id},"name":${$string(input.name)},"subCategories":${`[${input.subCategories.map(elem => `{"id":${elem.id},"name":${$string(elem.name)}}`).join(",")}]`}}`;
            return `[${input.map(elem => $so0(elem)).join(",")}]`;
        }; return stringify(assert(input, errorFactory)); } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getMenuCategories", null);
__decorate([
    core_1.TypedRoute.Get({ type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "number" === typeof input.totalPage && !Number.isNaN(input.totalPage) && (Array.isArray(input.menus) && input.menus.every(elem => "object" === typeof elem && null !== elem && $io1(elem)));
                const $io1 = input => "number" === typeof input.id && !Number.isNaN(input.id) && "string" === typeof input.name && "string" === typeof input.engName && ("number" === typeof input.price && !Number.isNaN(input.price)) && ("string" === typeof input.imageUrl && /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(input.imageUrl)) && "boolean" === typeof input.isDisplay && "boolean" === typeof input.isSoldOut;
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("number" === typeof input.totalPage && !Number.isNaN(input.totalPage) || $guard(_exceptionable, {
                        path: _path + ".totalPage",
                        expected: "number",
                        value: input.totalPage
                    }, errorFactory)) && ((Array.isArray(input.menus) || $guard(_exceptionable, {
                        path: _path + ".menus",
                        expected: "Array<Menu>",
                        value: input.menus
                    }, errorFactory)) && input.menus.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".menus[" + _index1 + "]",
                        expected: "Menu",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".menus[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".menus[" + _index1 + "]",
                        expected: "Menu",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".menus",
                        expected: "Array<Menu>",
                        value: input.menus
                    }, errorFactory));
                    const $ao1 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ("string" === typeof input.engName || $guard(_exceptionable, {
                        path: _path + ".engName",
                        expected: "string",
                        value: input.engName
                    }, errorFactory)) && ("number" === typeof input.price && !Number.isNaN(input.price) || $guard(_exceptionable, {
                        path: _path + ".price",
                        expected: "number",
                        value: input.price
                    }, errorFactory)) && ("string" === typeof input.imageUrl && (/^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(input.imageUrl) || $guard(_exceptionable, {
                        path: _path + ".imageUrl",
                        expected: "string & Format<\"url\">",
                        value: input.imageUrl
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".imageUrl",
                        expected: "(string & Format<\"url\">)",
                        value: input.imageUrl
                    }, errorFactory)) && ("boolean" === typeof input.isDisplay || $guard(_exceptionable, {
                        path: _path + ".isDisplay",
                        expected: "boolean",
                        value: input.isDisplay
                    }, errorFactory)) && ("boolean" === typeof input.isSoldOut || $guard(_exceptionable, {
                        path: _path + ".isSoldOut",
                        expected: "boolean",
                        value: input.isSoldOut
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "GetPaginatedMenusByCategory",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "GetPaginatedMenusByCategory",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $io1 = input => "number" === typeof input.id && "string" === typeof input.name && "string" === typeof input.engName && "number" === typeof input.price && ("string" === typeof input.imageUrl && /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(input.imageUrl)) && "boolean" === typeof input.isDisplay && "boolean" === typeof input.isSoldOut;
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"totalPage":${input.totalPage},"menus":${`[${input.menus.map(elem => `{"id":${elem.id},"name":${$string(elem.name)},"engName":${$string(elem.engName)},"price":${elem.price},"imageUrl":${$string(elem.imageUrl)},"isDisplay":${elem.isDisplay},"isSoldOut":${elem.isSoldOut}}`).join(",")}]`}}`;
            return $so0(input);
        }; return stringify(assert(input, errorFactory)); } }),
    (0, core_1.TypedException)(404, '해당 페이지를 찾을 수 없음', "NotFoundException"),
    __param(0, (0, core_1.TypedQuery)({ type: "assert", assert: (input, errorFactory) => { const decode = input => {
            const $params = core_1.TypedQuery.params;
            const $number = core_1.TypedQuery.number;
            input = $params(input);
            const output = {
                page: $number(input.get("page")),
                categoryId: $number(input.get("categoryId")),
                subCategoryId: $number(input.get("subCategoryId")) ?? undefined
            };
            return output;
        }; const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "number" === typeof input.page && (Math.floor(input.page) === input.page && -2147483648 <= input.page && input.page <= 2147483647 && 1 <= input.page) && ("number" === typeof input.categoryId && (Math.floor(input.categoryId) === input.categoryId && -2147483648 <= input.categoryId && input.categoryId <= 2147483647)) && (undefined === input.subCategoryId || "number" === typeof input.subCategoryId && (Math.floor(input.subCategoryId) === input.subCategoryId && -2147483648 <= input.subCategoryId && input.subCategoryId <= 2147483647));
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedQuery.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("number" === typeof input.page && (Math.floor(input.page) === input.page && -2147483648 <= input.page && input.page <= 2147483647 || $guard(_exceptionable, {
                        path: _path + ".page",
                        expected: "number & Type<\"int32\">",
                        value: input.page
                    }, errorFactory)) && (1 <= input.page || $guard(_exceptionable, {
                        path: _path + ".page",
                        expected: "number & Minimum<1>",
                        value: input.page
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".page",
                        expected: "(number & Type<\"int32\"> & Minimum<1>)",
                        value: input.page
                    }, errorFactory)) && ("number" === typeof input.categoryId && (Math.floor(input.categoryId) === input.categoryId && -2147483648 <= input.categoryId && input.categoryId <= 2147483647 || $guard(_exceptionable, {
                        path: _path + ".categoryId",
                        expected: "number & Type<\"int32\">",
                        value: input.categoryId
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".categoryId",
                        expected: "(number & Type<\"int32\">)",
                        value: input.categoryId
                    }, errorFactory)) && (undefined === input.subCategoryId || "number" === typeof input.subCategoryId && (Math.floor(input.subCategoryId) === input.subCategoryId && -2147483648 <= input.subCategoryId && input.subCategoryId <= 2147483647 || $guard(_exceptionable, {
                        path: _path + ".subCategoryId",
                        expected: "number & Type<\"int32\">",
                        value: input.subCategoryId
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".subCategoryId",
                        expected: "((number & Type<\"int32\">) | undefined)",
                        value: input.subCategoryId
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "GetPaginatedMenusByCategoryQuery",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "GetPaginatedMenusByCategoryQuery",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const output = decode(input); return assert(output, errorFactory); } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getPaginatedMenusByCategory", null);
__decorate([
    core_1.TypedRoute.Get(':id', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => "string" === typeof input.description && (Array.isArray(input.mainOptions) && input.mainOptions.every(elem => "object" === typeof elem && null !== elem && $io1(elem))) && (Array.isArray(input.subOptionGroups) && input.subOptionGroups.every(elem => "object" === typeof elem && null !== elem && $io2(elem))) && ("number" === typeof input.id && !Number.isNaN(input.id)) && "string" === typeof input.name && "string" === typeof input.engName && ("number" === typeof input.price && !Number.isNaN(input.price)) && ("string" === typeof input.imageUrl && /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(input.imageUrl)) && "boolean" === typeof input.isDisplay && "boolean" === typeof input.isSoldOut;
                const $io1 = input => "number" === typeof input.id && !Number.isNaN(input.id) && "string" === typeof input.name && ("number" === typeof input.price && !Number.isNaN(input.price));
                const $io2 = input => "number" === typeof input.id && !Number.isNaN(input.id) && "string" === typeof input.name && "boolean" === typeof input.isRequired && (undefined === input.multiSelectOptions || "object" === typeof input.multiSelectOptions && null !== input.multiSelectOptions && $io3(input.multiSelectOptions)) && (Array.isArray(input.subOptions) && input.subOptions.every(elem => "object" === typeof elem && null !== elem && $io4(elem)));
                const $io3 = input => "number" === typeof input.min && !Number.isNaN(input.min) && ("number" === typeof input.max && !Number.isNaN(input.max));
                const $io4 = input => "number" === typeof input.id && !Number.isNaN(input.id) && "string" === typeof input.name && ("number" === typeof input.price && !Number.isNaN(input.price)) && "boolean" === typeof input.isSoldOut;
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.description || $guard(_exceptionable, {
                        path: _path + ".description",
                        expected: "string",
                        value: input.description
                    }, errorFactory)) && ((Array.isArray(input.mainOptions) || $guard(_exceptionable, {
                        path: _path + ".mainOptions",
                        expected: "Array<__type>",
                        value: input.mainOptions
                    }, errorFactory)) && input.mainOptions.every((elem, _index1) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".mainOptions[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) && $ao1(elem, _path + ".mainOptions[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".mainOptions[" + _index1 + "]",
                        expected: "__type",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".mainOptions",
                        expected: "Array<__type>",
                        value: input.mainOptions
                    }, errorFactory)) && ((Array.isArray(input.subOptionGroups) || $guard(_exceptionable, {
                        path: _path + ".subOptionGroups",
                        expected: "Array<__type>.o1",
                        value: input.subOptionGroups
                    }, errorFactory)) && input.subOptionGroups.every((elem, _index2) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".subOptionGroups[" + _index2 + "]",
                        expected: "__type.o1",
                        value: elem
                    }, errorFactory)) && $ao2(elem, _path + ".subOptionGroups[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".subOptionGroups[" + _index2 + "]",
                        expected: "__type.o1",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".subOptionGroups",
                        expected: "Array<__type>.o1",
                        value: input.subOptionGroups
                    }, errorFactory)) && ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ("string" === typeof input.engName || $guard(_exceptionable, {
                        path: _path + ".engName",
                        expected: "string",
                        value: input.engName
                    }, errorFactory)) && ("number" === typeof input.price && !Number.isNaN(input.price) || $guard(_exceptionable, {
                        path: _path + ".price",
                        expected: "number",
                        value: input.price
                    }, errorFactory)) && ("string" === typeof input.imageUrl && (/^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(input.imageUrl) || $guard(_exceptionable, {
                        path: _path + ".imageUrl",
                        expected: "string & Format<\"url\">",
                        value: input.imageUrl
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".imageUrl",
                        expected: "(string & Format<\"url\">)",
                        value: input.imageUrl
                    }, errorFactory)) && ("boolean" === typeof input.isDisplay || $guard(_exceptionable, {
                        path: _path + ".isDisplay",
                        expected: "boolean",
                        value: input.isDisplay
                    }, errorFactory)) && ("boolean" === typeof input.isSoldOut || $guard(_exceptionable, {
                        path: _path + ".isSoldOut",
                        expected: "boolean",
                        value: input.isSoldOut
                    }, errorFactory));
                    const $ao1 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ("number" === typeof input.price && !Number.isNaN(input.price) || $guard(_exceptionable, {
                        path: _path + ".price",
                        expected: "number",
                        value: input.price
                    }, errorFactory));
                    const $ao2 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ("boolean" === typeof input.isRequired || $guard(_exceptionable, {
                        path: _path + ".isRequired",
                        expected: "boolean",
                        value: input.isRequired
                    }, errorFactory)) && (undefined === input.multiSelectOptions || ("object" === typeof input.multiSelectOptions && null !== input.multiSelectOptions || $guard(_exceptionable, {
                        path: _path + ".multiSelectOptions",
                        expected: "(__type.o2 | undefined)",
                        value: input.multiSelectOptions
                    }, errorFactory)) && $ao3(input.multiSelectOptions, _path + ".multiSelectOptions", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".multiSelectOptions",
                        expected: "(__type.o2 | undefined)",
                        value: input.multiSelectOptions
                    }, errorFactory)) && ((Array.isArray(input.subOptions) || $guard(_exceptionable, {
                        path: _path + ".subOptions",
                        expected: "Array<__type>.o2",
                        value: input.subOptions
                    }, errorFactory)) && input.subOptions.every((elem, _index3) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                        path: _path + ".subOptions[" + _index3 + "]",
                        expected: "__type.o3",
                        value: elem
                    }, errorFactory)) && $ao4(elem, _path + ".subOptions[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + ".subOptions[" + _index3 + "]",
                        expected: "__type.o3",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".subOptions",
                        expected: "Array<__type>.o2",
                        value: input.subOptions
                    }, errorFactory));
                    const $ao3 = (input, _path, _exceptionable = true) => ("number" === typeof input.min && !Number.isNaN(input.min) || $guard(_exceptionable, {
                        path: _path + ".min",
                        expected: "number",
                        value: input.min
                    }, errorFactory)) && ("number" === typeof input.max && !Number.isNaN(input.max) || $guard(_exceptionable, {
                        path: _path + ".max",
                        expected: "number",
                        value: input.max
                    }, errorFactory));
                    const $ao4 = (input, _path, _exceptionable = true) => ("number" === typeof input.id && !Number.isNaN(input.id) || $guard(_exceptionable, {
                        path: _path + ".id",
                        expected: "number",
                        value: input.id
                    }, errorFactory)) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }, errorFactory)) && ("number" === typeof input.price && !Number.isNaN(input.price) || $guard(_exceptionable, {
                        path: _path + ".price",
                        expected: "number",
                        value: input.price
                    }, errorFactory)) && ("boolean" === typeof input.isSoldOut || $guard(_exceptionable, {
                        path: _path + ".isSoldOut",
                        expected: "boolean",
                        value: input.isSoldOut
                    }, errorFactory));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "MenuDetail",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "MenuDetail",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $io1 = input => "number" === typeof input.id && "string" === typeof input.name && "number" === typeof input.price;
            const $io2 = input => "number" === typeof input.id && "string" === typeof input.name && "boolean" === typeof input.isRequired && (undefined === input.multiSelectOptions || "object" === typeof input.multiSelectOptions && null !== input.multiSelectOptions && $io3(input.multiSelectOptions)) && (Array.isArray(input.subOptions) && input.subOptions.every(elem => "object" === typeof elem && null !== elem && $io4(elem)));
            const $io3 = input => "number" === typeof input.min && "number" === typeof input.max;
            const $io4 = input => "number" === typeof input.id && "string" === typeof input.name && "number" === typeof input.price && "boolean" === typeof input.isSoldOut;
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"description":${$string(input.description)},"mainOptions":${`[${input.mainOptions.map(elem => `{"id":${elem.id},"name":${$string(elem.name)},"price":${elem.price}}`).join(",")}]`},"subOptionGroups":${`[${input.subOptionGroups.map(elem => $so2(elem)).join(",")}]`},"id":${input.id},"name":${$string(input.name)},"engName":${$string(input.engName)},"price":${input.price},"imageUrl":${$string(input.imageUrl)},"isDisplay":${input.isDisplay},"isSoldOut":${input.isSoldOut}}`;
            const $so2 = input => `{${undefined === input.multiSelectOptions ? "" : `"multiSelectOptions":${undefined !== input.multiSelectOptions ? `{"min":${input.multiSelectOptions.min},"max":${input.multiSelectOptions.max}}` : undefined},`}"id":${input.id},"name":${$string(input.name)},"isRequired":${input.isRequired},"subOptions":${`[${input.subOptions.map(elem => `{"id":${elem.id},"name":${$string(elem.name)},"price":${elem.price},"isSoldOut":${elem.isSoldOut}}`).join(",")}]`}}`;
            return $so0(input);
        }; return stringify(assert(input, errorFactory)); } }),
    __param(0, (0, core_1.TypedParam)('id', input => {
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
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getMenuDetailById", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)({ path: 'menu', version: common_1.VERSION_NEUTRAL }),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map