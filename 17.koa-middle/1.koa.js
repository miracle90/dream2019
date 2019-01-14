let Koa = require('koa')
let fs = require('fs')
let path = require('path')

let app = new Koa()

// 写 http，写静态文件处理的逻辑
// ajax 接口

// 用户访问我的时候
// 当用户访问 / 的时候
// /login 提交的数据
// koa-router 来实现路由
app.use(async (ctx, next) => {
    if (ctx.path === '/' && ctx.method === 'GET') {
        // 需要加content-type，默认会下载
        ctx.set('Content-Type', 'text/html;charset=utf-8')
        ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'))
    } else {
        await next()
    }
})

function bodyParser(ctx) {
    return new Promise((resolve, reject) => {
        // 在 koa 中，需要处理异步，全部改写成 promise
        let arr = []
        ctx.req.on('data', function (chunk) {
            arr.push(chunk)
        })
        ctx.req.on('end', function () {
            resolve(Buffer.concat(arr).toString())
        })
    })
}

app.use(async (ctx, next) => {
    if (ctx.path === '/login' && ctx.method === 'POST') {
        // 获取用户提交信息
        ctx.body = await bodyParser(ctx)
    }
})
app.listen(3000)
app.on('error', function (err) {
    console.log(err)
})