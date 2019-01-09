let http = require('http')
let fs = require('fs')
let path = require('path')
let url = require('url')
let util = require('util')
let mime = require('mime')

let stat = util.promisify(fs.stat)
let server = http.createServer(async function (req, res) {
    let {pathname} = url.parse(req.url)
    let realPath = path.join(__dirname, pathname)
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'lyy')
    // res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader("Access-Control-Allow-Credentials", true)
    // 缓存 OPTIONS
    res.setHeader('Access-Control-Max-Age', '10')
    console.log(req.headers.cookie)
    // OPTIONS请求，preflight，发请求前会先试探一下，而且不会发送请求体
    if (req.method === 'OPTIONS') return res.end()
    if (pathname === '/login') {
        // 登录的接口
        // 获取数据
        let arr = []
        req.on('data', function (chunk) {
            arr.push(chunk)
        })
        req.on('end', function () {
            let json = JSON.parse(Buffer.concat(arr).toString())
            res.end(json.name + "+" + json.password)
        })
        return
    }
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
})
let port = 3003
server.listen(port, function () {
    console.log(`server start ${port}`)
})