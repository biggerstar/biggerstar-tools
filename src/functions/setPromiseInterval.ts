import {sleep} from "@/functions/sleep";

type Task = {
  handler: Function
  interval: number
  opt: {
    /** 是否刚开始就运行一次 */
    doFirst?: boolean,
    /** 是否使用 clearPromiseInterval 清除定时器的时候执行一次回调 */
    doLast?: boolean,
  }
}
const intervalHandlers = new Map<number, Task>()
let id = 0

const doTask = async (task?: Task) => {  // 执行任务， 返回一个删除钩子和任务用时
  try {
    if (task) {
      const handler = task.handler
      await handler() // await func done
    }
  } catch (e) {
    throw e
  }
}

async function run(
  id: number,
  task: Task
) {
  let remainingTime = task.interval
  if (task.opt.doFirst) {
    doTask(task).then()
  }
  let loopTime = Math.max(200, Math.min(remainingTime, 500))  // 必须在第一次任务执行之后
  while (intervalHandlers.has(id)) {
    if (remainingTime >= loopTime) {   // 间隔 XXXms 检查是否快接近任务执行时间，如果接近则在下面进行任务执行
      await sleep(loopTime)
      remainingTime -= loopTime
      continue
    } else {
      await sleep(remainingTime) 
    }
    if (intervalHandlers.has(id)) { // 这里不知道前面 sleep 过程中是否ID被清除，所以需要确定ID还在才能执行任务
      doTask(task).then()
    }
    remainingTime = task.interval   // 时间到期后执行任务并重置时间
  }
}

/**
 * 直接清除定时器
 * */
export function clearPromiseInterval(intervalId: number) {
  if (typeof intervalId === 'number' && intervalHandlers.has(intervalId)) {
    const task = intervalHandlers.get(intervalId)
    if (task.opt?.doLast) {
      doTask(task).then()
    }
    intervalHandlers.delete(intervalId)
  }
}

/**
 * 设置定时器， 支持在任意时间点关闭定时器，不会像原生 setInterval 一样还会再执行最后一次
 * 解释 ( 不考虑 doFirst, doLast 两次执行 ):
 *     1. 如果定时器时间设置很长，假设 10000ms,
 *        1.1  在 3000ms 时间线上直接被关闭, 此时不会执行将会直接在 3000ms 被关闭
 *        1.2. 在 13000ms 时间线上被关闭， 此时已经执行了一次回调， 并且在第一次回调执行后的 3000ms 会直接关闭
 * doFirst 第一次直接执行一次
 * doLast 定时器被关闭的时候执行一次
 * 请注意， 该定时器不是精准的， 只能尽力接近定义的时间进行运行， 如果遇到例如文件IO 或者其他会阻塞线程运行的，具体执行时间将可能会延后
 * */
export function setPromiseInterval(
  handler: (...args: any[]) => Promise<any> | void,
  interval?: number,
  opt?: {
    doFirst?: boolean,
    doLast?: boolean,
  }
) {
  if (typeof handler !== 'function') {
    throw new Error('[setPromiseInterval] handler 应该是一个函数')
  }
  id += 1
  const task = {
    handler,
    interval: interval || 0,
    opt: Object.assign({
      doLast: false,
      doFirst: false,
    }, opt || {})
  }
  intervalHandlers.set(id, task)
  run(id, task).then()
  return id
}
