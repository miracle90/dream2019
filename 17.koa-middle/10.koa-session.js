let Koa = require('koa')
let Router = require('koa-router')
let session = require('koa-session')

let app = new Koa()
let router = new Router()

// session 必须是靠谱的
app.use(session({}, app))

// session 的数据存储在服务器上，存到 redis
// jwt 不需要存储用户的信息
router.get('/visit', function (ctx, next) {
    if (ctx.session.visit) {
        ctx.session.visit++
    } else {
        ctx.session.visit = 1
    }
    ctx.body = `你是第${ctx.session.visit}次访问`
})

router.get('/', async (ctx, next) => {
    // 状态码
    ctx.status = 302
    // 跳转路径
    ctx.set('Location', 'http://www.baidu.com')
    // 结束请求
    ctx.body = ''
    // ctx.redirect('http://www.baidu.com')
})

app.use(router.routes())
app.listen(3000)

// koa 中的中间件
// 1、bodyParser            支持 json、form、text 类型 body
// 2、koa-better-body       Full-featured koa body parser!，支持文件
// 3、koa-router
// 4、koa-views             Template rendering middleware for koa@2
// 5、koa-static            Koa static file serving middleware, wrapper for koa-send，新建 XXX 文件夹里面的文件可被外部访问
// 6、koa-session
