let express = require('express')
let path = require('path')
let multer = require('multer')
let cookieParser = require('cookie-parser')
// session 也是基于 cookie
let session = require('express-session')

let upload = multer({
    dest: path.join(__dirname, 'upload')
})
let app = express()

app.use(cookieParser('cookieParser'))
app.use(session({
    // 是否重新保存 session.id
    resave: true,
    // 是否没有用到 session 也保存起来
    saveUninitialized: true,
    // 秘钥
    secret: 'lyy'
}))

app.get('/write', function (req, res) {
    // res.cookie('name', 'lyy', {signed: true})
    // res.send('write ok')
})

app.get('/read', function (req, res) {
    // console.log(req.cookies)
    // res.send(req.signedCookies.name)
    res.send('hello')
})

app.get('/visit', function (req, res) {
    if (req.session.visit) {
        req.session.visit++
    } else {
        req.session.visit = 1
    }
    res.send(`当前用户访问次数${req.session.visit}`)
})

// 第二个参数中间件
app.post('/login', upload.single('avatar'), function (req, res) {
    console.log(req.body)
    res.send('首页')
})

// multer 文件上传
// body-parser 解析请求体
app.listen(3000)

// express 和 koa 中间件的区别
// koa 使用 promise、async 处理异步，基于 ex6
// express 使用 next 回调处理异步，并且内置了很多中间件，基于 es5

// koa-static        => express-static
// koa-bodyParser    => body-parser
// koa-router        => 自带
// koa-better-body   => multer
// cookie 内置       => cookie-parser
// koa-session       => express-session
// koa-views         => 内置

// promise => generator(redux-saga) => async + await 异步处理
// es6 闭包 变量提升 原型链 this指向 eventLoop messageChannerl mutationObserver
// node基础 process.nextTick setImmediate promise setTimeout
// Buffer 二进制 手写一个模块系统 commonjs 规范（module.exports require 一个文件是一个模块）
// fs.readFile writeFile => 流（边读边写，读一点写一点）fs.createReadStream
// 文件操作（深度广度、先序、中序、后序）
// eventEmitter 发布订阅 util mime url
// http 缓存 206 多语言 防盗链 websocket

// express + react
// vue + koa
// cms 系统 egg + react
