type Cursor<K, V> = {
  key: K;
  value: V;
  isAsc: boolean;
};

/**
 * @example
 * [{order: 1}, {id: 100}]
 * -> {
 *  OR: [
 *   {order: {gt: 1}},
 *   {order: 1, id: {gt: 100}}
 *  ]
 * }
 * 
 * [{age: 50}, {height: 10} {id: 100}]
 * -> {
 *  OR: [
 *   {age: {gt: 50}},
 *   {age: 50, height: {gt: 10}},
 *   {age: 50, height: 10, id: {gt: 100}}
 *  ]
 * }
 */
export function generateCursorWhere<C extends Cursor<any, any>>(cursors: C[], options: {
  reverse?: boolean;
} = {}) {
  return {
    OR: cursors.map((cursor, index, arr) => {
      const before = arr.slice(0, index);
      const and = before.reduce((prev, next) => {
        return {
          ...prev,
          [next.key]: next.value,
        };
      }, {});

      const op = (options.reverse ? !cursor.isAsc : cursor.isAsc) ? 'gt' : 'lt';

      return {
        ...and,
        [cursor.key]: { [op]: cursor.value },
      };
    }),
  };
}