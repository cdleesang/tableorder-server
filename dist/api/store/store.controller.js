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
exports.StoreController = void 0;
const core_1 = require("@nestia/core");
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
let StoreController = class StoreController {
    storeService;
    constructor(storeService) {
        this.storeService = storeService;
    }
    async getAllSlideImages() {
        return this.storeService.getAllSlideImages();
    }
};
exports.StoreController = StoreController;
__decorate([
    core_1.TypedRoute.Get('slide-image', { type: "assert", assert: (input, errorFactory) => { const assert = (input, errorFactory) => {
            const __is = input => {
                const $io0 = input => Array.isArray(input.imageUrls) && input.imageUrls.every(elem => "string" === typeof elem && /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(elem));
                return "object" === typeof input && null !== input && $io0(input);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Get.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => (Array.isArray(input.imageUrls) || $guard(_exceptionable, {
                        path: _path + ".imageUrls",
                        expected: "Array<string & Format<\"url\">>",
                        value: input.imageUrls
                    }, errorFactory)) && input.imageUrls.every((elem, _index1) => "string" === typeof elem && (/^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu.test(elem) || $guard(_exceptionable, {
                        path: _path + ".imageUrls[" + _index1 + "]",
                        expected: "string & Format<\"url\">",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".imageUrls[" + _index1 + "]",
                        expected: "(string & Format<\"url\">)",
                        value: elem
                    }, errorFactory)) || $guard(_exceptionable, {
                        path: _path + ".imageUrls",
                        expected: "Array<string & Format<\"url\">>",
                        value: input.imageUrls
                    }, errorFactory);
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "GetAllSlideImagesResponse",
                        value: input
                    }, errorFactory)) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "GetAllSlideImagesResponse",
                        value: input
                    }, errorFactory);
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            const $string = core_1.TypedRoute.Get.string;
            const $so0 = input => `{"imageUrls":${`[${input.imageUrls.map(elem => $string(elem)).join(",")}]`}}`;
            return $so0(input);
        }; return stringify(assert(input, errorFactory)); } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getAllSlideImages", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map