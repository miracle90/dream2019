let http = require('http')
let fs = require('fs')
let url = require('url')
let path = require('path')
let util = require('util')
let mime = require('mime')
let crypto = require('crypto')

// 第一次访问，给你一个文件的签名 Etag
// 下次再来访问，会带上这个标签 If-None-Match
// 再去拿文件当前的内容，生成一个标签，如果相等，返回304（需要读文件）

let stat = util.promisify(fs.stat)
let readFile = util.promisify(fs.readFile)
let server = http.createServer(async function (req, res) {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toLocaleString())
    let {pathname} = url.parse(req.url)
    let realPath = path.join(__dirname, pathname)
    try {
        let statObj = await stat(realPath)
        if (statObj.isFile()) {
            let content = await readFile(realPath)
            let sign = crypto.createHash('md5').update(content).digest('base64')
            let ifNoneMatch = req.headers['if-none-match']
            if (ifNoneMatch === sign) {
                res.statusCode = 304
                res.end()
            } else {
                res.setHeader('Etag', sign)
                // statObj 中有文件修改事件 ctime
                res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8')
                // pipe 分段读取
                fs.createReadStream(realPath).pipe(res)
            }
        } else {
            let url = path.join(__dirname, 'index.html')
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            // pipe 分段读取
            fs.createReadStream(url).pipe(res)
        }
    } catch (error) {
        res.statusCode = 404
        res.end('NOT FOUND')
    }
})

let port = 3000
server.listen(port, function () {
    console.log(`server start ${port}`)
})
server.on('error', function (err) {
    if (err.errno === 'EADDRINUSE') {
        port++
        server.listen(port)
    }
})

// 强制缓存 协商缓存
// Cache-Control + Expires

// Etag 和 Last-Modified 设置同时生效才可以， 有一个不行就不走缓存
// Last-Modified + If-Modified-Since
// Etag + If-None-Match

// Accept-Encoding 接受的编码 zh-ch
// 防盗链
// http-server 命令行工具
// koa