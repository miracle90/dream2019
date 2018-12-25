// node 中 this 的问题

// 模块化的问题
// console.log(this)

// function a() {
//   console.log(this)  
// }
// a()

// 执行 node 可以通过 node + 文件名的形式

// global 循环引用
// process 进程（线程被包含在进程里中，计算机分配资源的一个基本单位）
//          js 是单线程（主线程是单线程），一个进程里只有一个主线程
// Buffer 文件都是以二进制存在，node 中操作文件默认情况下是操作的内存，内存的表现方式就用的 buffer
// clearImmediate setImmediate
// setTimeout clearTimeout
// setInterval clearInterval

// console.log(global.process)

console.log(process.cwd())      // 当前的工作目录 current working directory
console.log(__dirname)       // 每个文件都会赠送两个属性，是一个绝对路径，表示的是当前文件所在的目录
console.log(__filename)      // 代表当前文件的文件名

// 环境，区分线上和线下环境，设置环境变量（在哪设置在哪取）
// set NODE_ENV=dev
// export NODE_ENV=dev
// webpack 插件 DefinePlugin
console.log(process.env.NODE_ENV)

console.log(process.argv)
let argObj = process.argv.slice(2).reduce((prev, next, index, arr) => {
    if (next.includes('--')) {
        prev[next.slice(2)] = arr[index + 1]
    }
    return prev
}, {})
console.log(argObj)

// 下一队列，微任务，异步，优先级大于 Promise
Promise.resolve().then(function () {
    console.log('promise')
})
process.nextTick(() => {
    console.log('nextTick')
})
console.log('ok')

// node 中的 eventLoop
// 1、主执行栈
// 2、专门放定时器的队列，setTimeout
// 3、专门放 i/o 操作的队列，fs.readFile
// 4、setImmediate队列
// 5、微任务队列

// 执行顺序：
// 1、主执行栈
// 2、扫描定时器中队列中定时器是否到时间，切换的过程，执行微任务队列
// 3、从定时器队列到 i/o 操作队列，切换的过程，再执行微任务队列
// 4、从 i/o 操作队列到 setImmediate 队列，再执行微任务队列（check阶段）
// 。。。
