let http = require('http')
let fs = require('fs')
let url = require('url')
let path = require('path')
let util = require('util')
let mime = require('mime')

let stat = util.promisify(fs.stat)

let server = http.createServer(async function (req, res) {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toLocaleString())
    
    // 第一次访问的时候，要给浏览器加一个头 Last-Modified
    // 第二次请求的时候，会自动带一个头，If-Modified-Since
    // 如果当前带过来的头和文件当前的状态有出入，说明文件被修改了
    // 时间变了，但是内容没更改，会出现再次访问文件

    let {pathname} = url.parse(req.url)
    let realPath = path.join(__dirname, pathname)
    try {
        let statObj = await stat(realPath)
        if (statObj.isFile()) {
            let prev = req.headers['if-modified-since']
            let current = statObj.ctime.toGMTString()
            if (prev === current) {
                res.statusCode = 304
                res.end()
            } else {
                // statObj 中有文件修改事件 ctime
                res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8')
                res.setHeader('Last-Modified', statObj.ctime.toGMTString())
                fs.createReadStream(realPath).pipe(res)
            }
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
