const transformMetadataKey = Symbol('transform');

export function Transform<T>(transform: (data: T) => any) {
  return Reflect.metadata(transformMetadataKey, transform);
}

export function getTransform(target: any, propertyKey: string): any {
  return Reflect.getMetadata(transformMetadataKey, target, propertyKey);
}