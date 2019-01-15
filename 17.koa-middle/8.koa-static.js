// koa-views 访问 / 的时候，返回 index.html
let Koa = require('koa')
let Router = require('koa-router')
// let fs = require('fs')
let path = require('path')
// let static = require('koa-static')
let fs = require('mz/fs')
let mime = require('mime')

let app = new Koa()
let router = new Router()

router.get('/', async (ctx, next) => {
    ctx.set('Content-Type', 'text/html;charset=utf-8')
    ctx.body = fs.createReadStream(path.resolve(__dirname, 'index.html'))
})

// 接口
// 路由
app.use(router.routes())

function static(dir) {
    return async (ctx, next) => {
        // 先找当前目录下是否有这个文件，如果没有向下执行
        let p = path.join(dir, ctx.path)
        console.log(p)
        try {
            let statObj = await fs.stat(p)
            if (statObj.isFile()) {
                ctx.set('Content-Type', `${mime.getType(p)};charset=utf-8`)
                ctx.body = fs.createReadStream(p)
            } else {
                p = path.join(p, 'index.html')
                // 判断有没有 index.html
                await fs.access(p)
                ctx.set('Content-Type', `text/html;charset=utf-8`)
                ctx.body = fs.createReadStream(p)
            }
        } catch (error) {
            await next()
        }
    }
}

// 当前目录下启动，static 中间件，如果有这个文件则不会继续，在 app.use(router.routes()) 下使用
app.use(static(__dirname))
app.listen(3000)
