type GenerateRandomStringOptions = {
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

/**
 * 随机生成一个字符串
 * */
export function generateRandomString(length = 16, seedOptions: Partial<GenerateRandomStringOptions> = {}) {
  const seedsInfo = Object.assign({
    uppercase: 1,
    lowercase: 1,
    integer: 1,
  }, seedOptions)
  let chars = ''
  for (const k in seedsInfo) {
    chars = chars + seedEnum[k].repeat(seedsInfo[k])
  }
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }
  return randomString;
}
