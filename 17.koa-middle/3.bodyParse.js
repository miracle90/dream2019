let Koa = require('koa')
let fs = require('fs')
let path = require('path')
let uuid = require('uuid')
// 只支持，json 和表单格式，不支持文件格式
// let bodyParser = require('koa-bodyparser')
// let betterBody = require('koa-better-body')
// koa 的转化插件 v1可能有 generator
let convert = require('koa-convert')

// 实现分隔的方法
Buffer.prototype.split = function (sep) {
    let offset = 0
    let arr = []
    let len = Buffer.from(sep).length
    let current
    while (-1 !== (current = this.indexOf(sep, offset))) {
        arr.push(this.slice(offset, current))
        offset = current + len
    }
    arr.push(this.slice(offset))
    return arr
}
// let arr = Buffer.from('拉拉**哈哈**刷刷').split('**')
// console.log(arr)

function betterBody({ uploadDir }) {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function (chunk) {
                arr.push(chunk)
            })
            ctx.req.on('end', function () {
                let r = Buffer.concat(arr)
                // 文件上传类型
                let ct = ctx.get('Content-Type')
                let fields = {}
                if (ct.startsWith('multipart/form-data')) {
                    // 分隔符
                    let boundary = '--' + ct.split('=')[1]
                    // 去头去尾
                    let lines = r.split(boundary).slice(1, -1)
                    console.log(lines)
                    lines.forEach(line => {
                        let [head, body] = line.split('\r\n\r\n')
                        // 头部信息
                        let h = head.toString()
                        if (h.includes('filename')) {
                            // 文件，拿到文件内容后，写入到真正的文件中
                            let content = line.slice(head.length + 4, -2)
                            // 需要一个文件名
                            let filename = `upload_${uuid.v4()}`
                            fs.writeFileSync(path.join(__dirname, 'upload', filename), content)
                            fields['file'] = filename
                        } else {
                            // 普通输入框内容
                            let [, key] = h.match(/name="(.+?)"/)
                            // 把内容取出来
                            let value = body.toString().slice(0, -2)
                            fields[key] = value
                        }
                    })
                } else if (ct === 'application/x-www-form-urlencoded') {
                    // ...
                } else if (ct === 'application/json') {
                    // ...
                } 
                ctx.request.fields = fields
                resolve()
            })
        })
        await next()
    }
}

let app = new Koa()

// app.use(bodyParser())
app.use(convert(betterBody({
    uploadDir: path.join(__dirname, 'upload')
})))
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
        ctx.body = ctx.request.fields
    }
})
app.listen(3000)
app.on('error', function (err) {
    console.log(err)
})