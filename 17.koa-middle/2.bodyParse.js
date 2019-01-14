let Koa = require('koa')
let fs = require('fs')
let path = require('path')
// let bodyParser = require('koa-bodyparser')

// 自己实现 bodyParser
function bodyParser() {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function (chunk) {
                arr.push(chunk)
            })
            ctx.req.on('end', function () {
                if (ctx.get('Content-Type') === 'application/x-www-form-urlencoded') {
                    console.log(require('querystring').parse(Buffer.concat(arr).toString()))
                    ctx.request.body = require('querystring').parse(Buffer.concat(arr).toString())
                }
                resolve()
            })
        })
        await next()
    }
}

let app = new Koa()
// 在内部会把解析后的结果，放到 ctx.fileds 上
app.use(bodyParser())
app.use(async (ctx, next) => {
    if (ctx.path === '/' && ctx.method === 'GET') {
        // 需要加content-type，默认会下载
        ctx.set('Content-Type', 'text/html;charset=utf-8')
        ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'))
    } else {
        await next()
    }
})

app.use((ctx, next) => {
    if (ctx.path === '/login' && ctx.method === 'POST') {
        // ctx.body = await bodyParser(ctx)
        // 把解析的请求提存储在 ctx.request.body 上
        ctx.body = ctx.request.body
    }
})
app.listen(3000)
app.on('error', function (err) {
    console.log(err)
})