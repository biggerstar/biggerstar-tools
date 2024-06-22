export function sleep(time: number = 0) {
  // 这里减去 1 是为了抵消 setTimeout 运行时间， 使得更接近真实间隔
  return new Promise(resolve => setTimeout(resolve, Math.max(time - 1, 0)))
}
