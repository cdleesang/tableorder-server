export type PartialByKeys<T extends Record<string, any>, K extends keyof T> = Omit<T, K> & {
  [key in K]?: T[key];
};