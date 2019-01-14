// 嵌套路由 给路由分类
// /person/add
// /person/remove
// /animal/add
// /animal/remove
let Koa = require('koa')
let Router = require('koa-router')

let app = new Koa()

// 总路由
let router = new Router()

// 人的路由
let person = new Router()
person.get('/add', function (ctx, next) {
    ctx.body = 'person add'
})
person.get('/remove', function (ctx, next) {
    ctx.body = 'person remove'
})

// 动物的路由
let animal = new Router()
animal.get('/add', function (ctx, next) {
    ctx.body = 'animal add'
})
animal.get('/remove', function (ctx, next) {
    ctx.body = 'animal remove'
})

// 将子路由挂载到总路由
router.use('/person', person.routes())
router.use('/animal', animal.routes())

// 挂载
app.use(router.routes())
app.listen(3000)