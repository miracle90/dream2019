// 分段请求 range 有范围的请求
// 分段下载
// 前端和服务器说 我要哪一段
// 服务器返回对应的内容 给你5个 总大小是100个

// Range:bytes=0-5
// Content-Range: bytes 0-5/7877

let http = require('http')
let path = require('path')
let url = require('url')
let fs = require('fs')
let port = 3000

let realPath = path.join(__dirname, 'download.txt')
let statObj = fs.statSync(realPath)
let server = http.createServer((req, res) => {
    // let urlObj = url.parse(req.url, true)
    let range = req.headers['range']
    if (range) {
        let matches = range.match(/(\d*)-(\d*)/)
        let [, start, end] = matches
        start = +(start || 0)
        end = +(end || statObj.size)
        res.statusCode = 206
        res.setHeader('Content-Length', end - start + 1)
        res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size}`)
        console.log(end, start)
        fs.createReadStream(realPath, {start, end}).pipe(res)
    } else {
        // 没有分段头，那就表示返回整个文件
        // 读取文件，然后直接返回
        fs.createReadStream(realPath).pipe(res)
    }
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

// 浏览器不会自己去记录下载的位置
// 自己写一个客户端来实现

