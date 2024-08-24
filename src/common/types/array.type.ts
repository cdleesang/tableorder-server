export type Head<T extends any[]> = T[0];
export type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;