export declare function Transform<T>(transform: (data: T) => any): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function getTransform(target: any, propertyKey: string): any;
