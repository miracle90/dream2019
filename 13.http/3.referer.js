// 两个网站
// www.zf1.cn       http://www.zf1.cn/1.png
// www.zf2.cn       错误图片

let fs = require('fs')
let path = require('path')
let http = require('http')
let url = require('url')

// 白名单
let whiteList = ['localhost:3003']
let port = 3000
let server = http.createServer((req, res) => {
    // res.end('www.lyy123.com')
    let { pathname } = url.parse(req.url)
    if (pathname === '/') {
        return fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
    }
    let realPath = path.join(__dirname, pathname)
    let referer = req.headers['referer']
    fs.stat(realPath, function (err, statObj) {
        if (err) {
            res.statusCode = 404
            res.end()
            return
        }
        // 要校验一下，引用的来源
        if (referer) {
            // 需要获取图片的 referer
            let refererHost = url.parse(referer).host
            // 获取当前图片所在的主机名
            let currentHost = req.headers['host']
            console.log(refererHost, currentHost)
            if (refererHost === currentHost || whiteList.includes(refererHost)) {
                fs.createReadStream(path.join(__dirname, 'a.jpg')).pipe(res)
            } else {
                fs.createReadStream(path.join(__dirname, 'b.jpg')).pipe(res)
            }
        } else {
            fs.createReadStream(path.join(__dirname, 'a.jpg')).pipe(res)
        }
    })
})
server.listen(port, function () {
    console.log(`server start ${port}`)
})
server.on('error', function (err) {
    if (err.errno === 'EADDRINUSE') {
        port++
        server.listen(port)
    }
})