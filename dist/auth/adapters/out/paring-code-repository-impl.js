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
exports.ParingCodeRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
let ParingCodeRepositoryImpl = class ParingCodeRepositoryImpl {
    paringCodes = [];
    constructor() {
        setInterval(() => this.clearExpiredParingCodes(), 60 * 1000);
    }
    saveParingCode(tableId, code, expiresIn = 5 * 60 * 1000) {
        if (this.paringCodes.some(paringCode => paringCode.code === code)) {
            throw new Error('Already exists');
        }
        this.paringCodes.push({
            tableId,
            code,
            expiresAt: new Date(Date.now() + expiresIn),
        });
        return Promise.resolve();
    }
    findByParingCode(code) {
        return Promise.resolve(this.paringCodes.find(paringCode => paringCode.code === code) || null);
    }
    deleteParingCode(code) {
        this.paringCodes = this.paringCodes.filter(paringCode => paringCode.code !== code);
        return Promise.resolve();
    }
    clearExpiredParingCodes() {
        this.paringCodes = this.paringCodes.filter(paringCode => paringCode.expiresAt > new Date());
    }
};
exports.ParingCodeRepositoryImpl = ParingCodeRepositoryImpl;
exports.ParingCodeRepositoryImpl = ParingCodeRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ParingCodeRepositoryImpl);
//# sourceMappingURL=paring-code-repository-impl.js.map