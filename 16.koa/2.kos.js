// // let Koa = require('./koa/application')
// let Koa = require('koa')

// let app = new Koa()

// // 1、权限校验
// // 2、可以在上面进行一些统一功能的扩展
// // next 如果不调用就不能继续执行
// app.use((ctx, next) => {
//     ctx.body = 'hello1'
//     next()
// })
// app.use((ctx) => {
//     ctx.body = 'hello2'
// })
// app.use((ctx) => {
//     ctx.body = 'hello3'
// })

// app.listen(3000)

// 迭代 删除目录
let app = {}
app.middlewares = []
app.use = fn => {
    app.middlewares.push(fn)
}
app.use(next => {
    console.log(1)
    next()
    console.log(2)
})
app.use(next => {
    console.log(3)
    next()
    console.log(4)
})
app.use(next => {
    console.log(5)
    next()
    console.log(6)
})
function dispatch(i) {
    if (i === app.middlewares.length) return 
    let middle = app.middlewares[i]
    // 传入 () => dispatch(i + 1)，相当于执行 next()
    middle(() => dispatch(i + 1))
}
dispatch(0)