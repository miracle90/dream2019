let Koa = require('./koa/application')
// let Koa = require('koa')

// 实例
let app = new Koa()

// 实现中间件
app.use((ctx) => {
    // ctx req res http.createServer((req, res))
    // ctx request/response 自己封装的对象
    // 什么都不写，默认不返回结果，Not Found
    // res.end('hello koa')
    // console.log(ctx)
    console.log(ctx.req.url)
    console.log(ctx.request.req.url)
    console.log(ctx.request.url)
    // ctx.url => ctx.request.url
    console.log(ctx.url)
    console.log(ctx.path)
    // console.log(ctx.response.req.url)

    ctx.response.body = 'world'
    // ctx.body = 'world'
    console.log(ctx.body)
    
    // ctx = {}
    // ctx.request = {}
    // ctx.req = ctx.request.req = req
    // ctx.res = ctx.response.res = res
    // ctx.path 代理 ctx.request.path 属性
})

// 监听端口的
app.listen(3000)