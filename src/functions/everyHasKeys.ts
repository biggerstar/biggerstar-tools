/**
 * 判断两个对象是否都有某个或多个 key
 * */
export function everyHasKeys<T extends Record<any, any>>(obj1: Record<any, any>, obj2: Record<any, any>, keys: Array<keyof T>) {
  return keys.every(key => Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key))
}
