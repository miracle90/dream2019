// 模块化
// 前端 
// requirejs AMD 依赖前置 在使用模块之前先定义好
// seajs CMD 依赖就近 需要的时候加载

// 为什么要有模块化     把代码维护到一个对象里
// 1、防止变量污染全局
// 2、防止代码重名

// 闭包实现，一个不销毁的作用域

// commonjs node 的模块化规范 require
// esModule es6 import

// umd 包含了 commonjs AMD CMD

// 规定：
// 1、一个文件就是一个模块
// 2、如何导入别人的模块 require
// 3、模块的导出 module.exports

// webpack -> commonjs 思想

// node 里面有三种模块
// 1、内置模块（核心模块）     require('fs')
// 2、第三方模块              require('bluebird')
// 3、文件模块                require('./promise.js')

// 引入文件的时候可以省略 .js .json .node
let a = require('./a')      // require 是同步的，可以马上拿到结果

// 相当于是一个闭包
// let a = function () {
//     module.exports = 'hello'
//     return module.exports
// }()

console.log(a)

// 怎么让字符串执行 eval & new Function

let fs = require('fs')
let path = require('path')

// 用 join 或者 resolve 都能拼出来一个绝对路径
// 更建议由 / 就用 join，没有就用resolve
// console.log(path.join(__dirname, 'a.js'))
// console.log(path.resolve(__dirname , 'a.js'))

let content = fs.readFileSync(path.join(__dirname, 'a.js'), 'utf8')
console.log(content)

// let name = 'lyy'        // 非沙箱的环境
// eval('console.log(name)')

// let str = 'var a = 1; return a'
// let fn = new Function('x', 'y', str)
// console.log(fn(1, 2))

// 虚拟的环境
let vm = require('vm')
let name = 'lyy'
vm.runInThisContext('console.log(name)')