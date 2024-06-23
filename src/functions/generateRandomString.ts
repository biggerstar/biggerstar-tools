import {isNumber} from "is-what";

type SeedRepeatOptions = {
  /**
   *  ABCDEFGHIJKLMNOPQRSTUVWXYZ   占用的个数, 数字越大，生成字段内的概率越大
   * @default 1
   * */
  uppercase: number
  /**
   * abcdefghijklmnopqrstuvwxyz   占用的个数, 数字越大，生成字段内的概率越大
   * @default 1
   * */
  lowercase: number
  /**
   * 0123456789    占用的个数, 数字越大，生成字段内的概率越大
   * @default 1
   * */
  integer: number
}

const seedEnum = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  integer: '0123456789',
}

type GenerateRandomStringOptions = {
  /** 默认内置种子的重复次数 */
  seedRepeat?: Partial<SeedRepeatOptions>
  /** 自定义种子定义 */
  seed?: Array<{
    string: string,
    repeat: number
  }>
}

/**
 * 随机生成一个字符串
 * */
export function generateRandomString(length = 16, options: Partial<GenerateRandomStringOptions> = {}) {
  const seedRepeatsInfo = Object.assign({
    uppercase: 1,
    lowercase: 1,
    integer: 1,
  }, options.seedRepeat || {})
  let chars = ''
  for (const k in seedRepeatsInfo) {
    if (isNumber(seedRepeatsInfo[k]) && seedRepeatsInfo[k] > 0) {
      chars = chars + seedEnum[k].repeat(seedRepeatsInfo[k])
    }
  }
  ;(options.seed || []).forEach(item => {
    chars = chars + (item.string || '').repeat(item.repeat || 1)
  })
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }
  return randomString;
}
