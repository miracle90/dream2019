let Koa = require('koa')

let app = new Koa()

// ctx 包含了原生的 req 和 res，又扩展了 request， response
// 尽量不要调用 req， res
// 洋葱模型，和 res.end() 不同
app.use((ctx, next) => {
    ctx.body = {name: 'lyy'}
    console.log(1)
    next()
    console.log(2)
})
app.use((ctx, next) => {
    console.log(3)
    ctx.body = {
        name: 'next'
    }
    next()
    console.log(4)
})
app.use(ctx => {
    console.log(5)
    ctx.body = {
        name: '洋葱模型'
    }
    console.log(6)
})
app.listen(3000)
