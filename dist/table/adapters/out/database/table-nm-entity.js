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
exports.TableNMEntity = void 0;
const column_decorator_1 = require("../../../../common/modules/firebird/decorators/column.decorator");
class TableNMEntity {
    seq;
    posNo;
    name;
    posX;
    posY;
    backgroundColor;
    width;
    height;
}
exports.TableNMEntity = TableNMEntity;
__decorate([
    (0, column_decorator_1.Column)('ISEQ'),
    __metadata("design:type", Number)
], TableNMEntity.prototype, "seq", void 0);
__decorate([
    (0, column_decorator_1.Column)('POSNO'),
    __metadata("design:type", Number)
], TableNMEntity.prototype, "posNo", void 0);
__decorate([
    (0, column_decorator_1.Column)('TNAME'),
    __metadata("design:type", String)
], TableNMEntity.prototype, "name", void 0);
__decorate([
    (0, column_decorator_1.Column)('POSX'),
    __metadata("design:type", Number)
], TableNMEntity.prototype, "posX", void 0);
__decorate([
    (0, column_decorator_1.Column)('POSY'),
    __metadata("design:type", Number)
], TableNMEntity.prototype, "posY", void 0);
__decorate([
    (0, column_decorator_1.Column)('BCOLOR'),
    __metadata("design:type", Object)
], TableNMEntity.prototype, "backgroundColor", void 0);
__decorate([
    (0, column_decorator_1.Column)('WIDTH'),
    __metadata("design:type", Object)
], TableNMEntity.prototype, "width", void 0);
__decorate([
    (0, column_decorator_1.Column)('HEIGHT'),
    __metadata("design:type", Object)
], TableNMEntity.prototype, "height", void 0);
//# sourceMappingURL=table-nm-entity.js.map