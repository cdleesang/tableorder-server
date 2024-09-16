/**
 * kotlin when과 유사한 함수
 * 
 * @example
 * const value = when({
 *  a: 1,
 *  b: 2,
 * }, 'a', 3);
 * // value === 1
 * const defaultValue = when({
 *  a: 1,
 *  b: 2,
 * }, 'c', 3);
 * // defaultValue === 3
 */
export function ktWhen<V, M extends Record<string, any>, E>(
  value: V,
  switchMap: M,
  elseValue: E,
): V extends keyof M ? M[V] : E {
  return (switchMap[value as keyof M] ?? elseValue) as V extends keyof M ? M[V] : E;
}