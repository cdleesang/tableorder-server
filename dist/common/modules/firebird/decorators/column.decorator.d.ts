export declare function Column(columnName: string): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function getColumnName(target: any, propertyKey: string): string | undefined;
