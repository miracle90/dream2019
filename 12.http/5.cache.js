// from memory cache
// from disk cache

let http = require('http')
let fs = require('fs')
let url = require('url')
let path = require('path')
let util = require('util')
let mime = require('mime')

let stat = util.promisify(fs.stat)

let server = http.createServer(async function (req, res) {
    // index.html不会缓存，针对 http/1.1，老版本用 Expires
    res.setHeader('Cache-Control', 'max-age=10')
    res.setHeader('Expires', new Date(Date.now() + 10*1000).toLocaleString())
    let { pathname } = url.parse(req.url)
    let realPath = path.join(__dirname, pathname)
    try {
        let statObj = await stat(realPath)
        console.log(statObj.isFile())
        if (statObj.isFile()) {
            res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8')
            fs.createReadStream(realPath).pipe(res)
        } else {
            let url = path.join(__dirname, 'index.html')
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
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

// Cache-Control, 'no-cache'
// 老版本 Expires，已经废弃了

// 最后修改时间 statObj.ctime.toGMTString()
// 时间变了，内容没变 + 1s内
// Last-Modified + If-Modified-Since
// 304 Not Modified

// Etag + if-None-Match

// 读文件对文件进行加密，太耗性能，结合使用（根据文件大小+文件修改时间 = etag）

// let crypto = require('crypto')

// crypto 加密  md5（摘要算法，不能反解）

// 加盐算法

// 弄一个密码，根据我的密码进行加密，加密 cookie

// let r = crypto.createHmac('sha1', 'lyy').update('123456').digest('base64')
// console.log(r)

// Etag 和 Last-Modified 设置同时生效才可以，有一个就不走缓存

// from memory cache 重启就没了。。。

