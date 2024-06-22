/**
 * 数组中随机选择一个成员 
 * */
export function choice(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}
