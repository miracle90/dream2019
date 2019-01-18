// import $ from 'expose-loader?$!jquery'
import $ from 'jquery'
import './index.less'

// require('style-loader!css-loader!index.css')

// 把 $ 挂载在 window 上
// 1、expose-loader 暴露的 loader pre + normal + inline + post
// 2、用 webpack 插件，每个模块都提供一个 $
console.log(window.$)
console.log($)

// 图片的引入方式
// 1、js引入 => file-loader
// 会把 logo 进行生成一张新的图片放到 dist 目录下，会返回一个新的图片地址
import logo from './2.jpg'      // 依赖的文件会被打包
let img = new Image()
// let img = new Img()
img.src = logo // 不能放字符串
document.body.appendChild(img)

// 2、css背景图 => css-loader
// 3、img标签 => html-withimg-loader




















// import './a'
// import './index.less'
// import '@babel/polyfill'

// console.log('index.less')

// let fn = () => {
//     console.log('arrow Fn')
// }
// fn()

// // classCallCheck
// class A {

// }

// function * gen() {
//     yield 1
// }
// console.log(gen().next())

// // 引入 @babel/polyfill，写了一套完整的api，String.prototype.includes
// console.log('aaa'.includes('a'))

// babel-loader
// @babel/core
// @babel/preset-env
// @babel/plugin-transform-runtime
// @babel/runtime
// @babel/polyfill
// 转化类属性
// @babel/plugin-proposal-class-properties
// 转化装饰器
// @babel/plugin-proposal-decorators

// console.log('eslint')