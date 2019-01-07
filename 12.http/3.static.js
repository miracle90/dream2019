let http = require('http')
let fs = require('fs')
let path = require('path')
let url = require('url')
let util = require('util')
let mime = require('mime')

// Promise化
let stat = util.promisify(fs.stat)

let server = http.createServer(async function (req, res) {
    let { pathname } = url.parse(req.url)
    let realPath = path.join(__dirname, pathname)

    try {
        let statObj = await stat(realPath)
        if (statObj.isFile()) {
            // 拿到扩展名，进行分类
            res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8')
            fs.createReadStream(realPath).pipe(res)
        } else {
            let url = path.join(realPath, 'index.html')
            res.setHeader('Content-Type', 'text/html;charset=utf8')
            fs.createReadStream(url).pipe(res)
        }
    } catch (error) {
        // 不存在，返回 404
        res.statusCode = 404
        res.end('NOT FOUND')
    }


    // fs.stat(realPath, function (err, statObj) {
    //     // 文件不存在，404，返回响应
    //     if (err) {
    //         console.log('err')
    //         res.statusCode = 404
    //         res.end('Not Found')
    //     } else {
    //         if (statObj.isFile()) {
    //             res.setHeader('Content-Type', 'text/html;charset=utf8')
    //             // 如果是文件，把结果导给响应
    //             fs.createReadStream(realPath).pipe(res)
    //         } else {
    //             let url = path.join(realPath, 'index.html')
    //             console.log(url)
    //             fs.createReadStream(url).pipe(res)
    //         }
    //     }
    // })
    // path.resolve 会把 '/解析成根路径'，使用 join
    // fs.createReadStream(path.join(__dirname, pathname))

    // res.pipe(ws)

    // // 只有当有请求体的时候才会触发 on('data')
    // req.on('data', function () {
    //     console.log('data')
    // })
    // // 有没有请求体都可以触发 on('end')
    // req.on('end', function () {
    //     console.log('end')
    // })
})

server.listen(3000, function () {
    console.log(`server start 3000`)
})