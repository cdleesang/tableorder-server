"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnName = exports.Column = void 0;
const columnMetadataKey = Symbol('column');
function Column(columnName) {
    return Reflect.metadata(columnMetadataKey, columnName);
}
exports.Column = Column;
function getColumnName(target, propertyKey) {
    return Reflect.getMetadata(columnMetadataKey, target, propertyKey);
}
exports.getColumnName = getColumnName;
//# sourceMappingURL=column.decorator.js.map