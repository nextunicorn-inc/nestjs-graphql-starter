declare global {
  interface Array<T> {
    associateBy<Key extends string | number>(
      keyExtractor: (each: T) => Key,
    ): Record<Key, T>;
  }
}

Array.prototype.associateBy = function <Key>(keyExtractor: (each: any) => Key) {
  return this.reduce((map, each) => {
    map[keyExtractor(each)] = each;
    return map;
  }, {});
};

export function associateBy<Key extends string | number, T>(
  array: Array<T>,
  keyExtractor: (each: any) => Key,
) {
  return array.associateBy(keyExtractor);
}
