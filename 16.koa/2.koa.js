let Koa = require('./koa/application')
// let Koa = require('koa')
let fs = require('fs')
let path = require('path')

let app = new Koa()

// // 1、权限校验
// // 2、可以在上面进行一些统一功能的扩展
// // next 如果不调用就不能继续执行
// 中间件函数都可以放 async 函数（Promise）

let logger = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('logger')
            resolve()
        }, 1000);
    })
}

// koa 中如果写了 next，必须在 next 前面加一个 await
app.use(async (ctx, next) => {
    // throw new Error('出错了')
    console.log(1)
    // ctx.body = 'hello1'
    // ctx.body = {name: 'lyy'}
    // ctx.body = 404
    // ctx.set('Content-Type', 'text/html;charset=utf-8')
    ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'))
    // next 方法并没有等待下一个 async 函数执行完（解决方案 await / return）
    await next()
    console.log(2)
})
app.use(async (ctx, next) => {
    console.log(3)
    // ctx.body = 'hello2'
    await logger()
    next()
    console.log(4)
})
app.use(async (ctx, next) => {
    console.log(5)
    // ctx.body = 'hello3'
    next()
    console.log(6)
})

app.on('error', function (err) {
    console.log(err)
})
app.listen(3000)

// 迭代 删除目录
// let app = {}
// app.middlewares = []
// app.use = fn => {
//     app.middlewares.push(fn)
// }
// app.use(next => {
//     console.log(1)
//     next()
//     console.log(2)
// })
// app.use(next => {
//     console.log(3)
//     next()
//     console.log(4)
// })
// app.use(next => {
//     console.log(5)
//     next()
//     console.log(6)
// })
// function dispatch(i) {
//     if (i === app.middlewares.length) return 
//     let middle = app.middlewares[i]
//     // 传入 () => dispatch(i + 1)，相当于执行 next()
//     middle(() => dispatch(i + 1))
// }
// dispatch(0)


// koa 中间件（异步）
// ctx.request
// ctx.get()