// /       =>  首页
// /login  =>  登录
// /reg    =>  注册

let Koa = require('koa')
let Router = require('./koa-router')

let app = new Koa()
let router = new Router()

// 1、配置路由
// 会把路径相同的回调函数，过滤出来，进行组合 compose
router.get('/', async (ctx, next) => {
    ctx.body = '首页'
    next()
})
router.get('/', async (ctx, next) => {
    ctx.body = '注册'
    // next()
})
router.get('/login', async (ctx, next) => {
    ctx.body = '登录'
    
})

// 2、装载路由
app.use(router.routes())
app.use((ctx, next) => {
    ctx.body = 'body end'
})
// 允许的方法，不写没有提示     =>      405 Method Not Allowed
// app.use(router.allowedMethods())
app.listen(3000)

// 嵌套路由 给路由分类
// /person/add
// /person/remove

// /animal/add
// /animal/remove