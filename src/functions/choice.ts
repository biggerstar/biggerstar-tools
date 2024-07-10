/**
 * 数组中随机选择一个成员
 * */
export function choice<T extends any>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
