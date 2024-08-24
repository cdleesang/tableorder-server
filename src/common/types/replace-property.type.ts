import { Tail } from './array.type';

/**
 * Object의 속성을 변경하는 타입
 * 
 * @example
 * type Test = {
 *  a: string;
 *  b: number;
 * };
 * type Result = ReplaceProperty<Test, 'a', number>;
 * // Result: {
 * //  a: number;
 * //  b: number;
 * // };
 */
export type ReplaceProperty<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V; };

/**
 * Object의 중첩된 속성을 변경하는 타입
 * 
 * @example
 * type Test = {
 *  a: {
 *   b: {
 *    c: string;
 *   }[];
 *  };
 *  d: number;
 * };
 * type Result = ReplaceNestedProperty<Test, ['a', 'b', number, 'c'], number>;
 * // Result: {
 * //  a: {
 * //   b: {
 * //    c: number;
 * //   }[];
 * //  };
 * //  d: number;
 * // };
 */
// export type ReplaceNestedProperty<T, K extends (string | number)[], V> = {
//   [P in keyof T]: P extends K[0]
//     ? ReplaceNestedProperty<T[P], Tail<K>, V>

// }
export type ReplaceNestedProperty<T, K extends (string | number)[], V> = {
  [P in keyof T]: P extends K[0]
    ? Tail<K> extends []
      ? V
      : ReplaceNestedProperty<T[P], Tail<K>, V>
    : T[P]
};