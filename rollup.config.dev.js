const path = require('path')
// 这个插件的作用是将 项目中使用的 第三方模块 混入打包到dist中
const NodeResolve = require('rollup-plugin-node-resolve')
// 解析rollup默认不支持commonJs引入 加载这个包才行
const Commonjs = require('rollup-plugin-commonjs')
// babel插件 es6转换低版本语法
const Babel = require('rollup-plugin-babel')
// 让rollup可以编译json的代码
const Json = require('rollup-plugin-json')
// // 代码压缩插件
// const {terser} = require('rollup-plugin-terser')
// 解析.vue后缀的文件
const Vue = require('rollup-plugin-vue')
const Css = require('rollup-plugin-postcss')
const inputPath = path.resolve(__dirname, './src/index.js')
const outputUmdPath = path.resolve(__dirname, './dist/bundle.Umd.js')
const outputEsPath = path.resolve(__dirname, './dist/bundle.es.js')

module.exports = {
  input: inputPath,
  output: [
    {
      file: outputEsPath,
      format: 'es', // 输出模块协议 es umd command
      name: 'bundleName', // 在window下面 会挂载一个这样的对象
      globals: {
        'vue': 'vue'
      }
    },
    {
      file: outputUmdPath,
      format: 'umd', // 输出模块协议 es umd command
      name: 'bundleName',
      globals: {
        'vue': 'vue'
      }
    }
  ],
  plugins: [
    NodeResolve(),
    Commonjs(),
    Babel({
      exclude: 'node_modules/**', //排除不编译的文件
      runtimeHelpers: true,
      // 使其支持async函数
      plugins: [
        ['@babel/transform-runtime', {
          regenerator: true
        }]
      ]
    }),
    Json(),
    Vue(),
    Css({
      plugins: []
    })
  ],
  // vue的代码不会打包进去 即使使用了 rollup-plugin-node-resolve 这个插件
  external: ['vue']
}
// cnpm i -g @babel/node
