"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransform = exports.Transform = void 0;
const transformMetadataKey = Symbol('transform');
function Transform(transform) {
    return Reflect.metadata(transformMetadataKey, transform);
}
exports.Transform = Transform;
function getTransform(target, propertyKey) {
    return Reflect.getMetadata(transformMetadataKey, target, propertyKey);
}
exports.getTransform = getTransform;
//# sourceMappingURL=transform.decorator.js.map