export * from './functions'
export * from './class'
// 其他模块
export * from './modules/is-what'  // 因为 is-what 的类型定义缺陷， 这里手动明确导出
// 代理其他库
export * from '@biggerstar/mitt-bus'
export * from '@biggerstar/deepmerge'
