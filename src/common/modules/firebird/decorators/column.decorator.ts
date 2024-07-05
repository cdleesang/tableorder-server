const columnMetadataKey = Symbol('column');

export function Column(columnName: string) {
  return Reflect.metadata(columnMetadataKey, columnName);
}

export function getColumnName(target: any, propertyKey: string): string | undefined {
  return Reflect.getMetadata(columnMetadataKey, target, propertyKey);
}