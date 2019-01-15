// koa-views 前后端不分离才用

let path = require('path')
let fs = require('fs')
let Koa = require('koa')
let Router = require('koa-router')
// let views = require('koa-views')

let app = new Koa()
let router = new Router()

function render(tplStr, obj) {
    let head = `with(obj){\r\n`
    head += "var str = `"
    let content = tplStr.replace(/<%=(.+?)%>/g, function () {
        return '${' + arguments[1] + '}'
    })
    content = content.replace(/<%(.+?)%>/g, function () {
        return '`\r\n' + arguments[1] + '\r\nstr+=`'
    })
    let tail = '`\r\n}\r\n return str;'
    let total = head + content + tail
    let fn = new Function('obj', total)
    return fn(obj)
}

function views(dir) {
    return async (ctx, next) => {
        ctx.render = function (p, obj) {
            return new Promise((resolve, reject) => {
                let realPath = path.resolve(dir, p)
                // 读取模板，进行渲染
                fs.readFile(realPath, 'utf8', function (err, data) {
                    resolve(render(data, obj))
                })
            })
        }
        await next()
    }
}

app.use(views(__dirname, {
    extension: 'ejs'
}))
router.get('/', async (ctx, next) => {
    console.log('___')
    ctx.set('Content-Type', 'text/html;charset=utf-8')
    ctx.body = await ctx.render('template.ejs', { arr: [1, 2, 3, 4]})
})
app.use(router.routes())
app.listen(3000)
app.on('error', function (err) {
    console.log(err)
})