/**
 * 随机获取两个数之间的值
 * */
export function randomClamp(max:number, min:number = 0) {
  return Math.floor(Math.random() * (Math.abs(max - min)) + min)
}
