let Koa = require('koa')
let Router = require('koa-router')
let path = require('path')
let static = require('koa-static')
let fs = require('mz/fs')
let mime = require('mime')
let crypto = require('crypto')

let app = new Koa()
let router = new Router()
app.keys = ['lyy']
router.get('/write', async (ctx, next) => {
    ctx.cookies.set('name1', 'lyy', {
        // 带签名的 cookie，更安全
        signed: true
    })
})
router.get('/read', async (ctx, next) => {
    let name1 = ctx.cookies.get('name1', {signed:true})
    ctx.body = 'read: ' + name1
})

// 验证用户是否有权限
// session
router.get('/validate', async (ctx, next) => {
    let val = ctx.cookies.get('login')
    if (!val) {
        // ctx.redirect('/home.html')
        ctx.body = {
            code: 1,
            data: '用户未登录'
        }
    } else {
        ctx.body = {
            code: 0,
            data: '用户登录'
        }
    }
})

// 用户登录，跳转到首页
router.get('/login', async (ctx, next) => {
    ctx.cookies.set('login', true)
    // ctx.redirect('/home.html')
    ctx.body = {
        code: 0,
        data: '登录成功'
    }
})

router.get('/home', async (ctx, next) => {
    ctx.cookies.set('login', true)
    ctx.redirect('/home.html')
})

app.use(router.routes())
app.use(static(__dirname))
app.listen(3000)

// 验证用户是否登录
// 登录后：给个 cookie 表示登录过了

// 登录页 => 首页

// 签名算法
// let r = crypto.createHmac('sha1', 'lyy').update('name1=lyy').digest('base64')
// console.log(r)
