// 客户端 node 来充当
// 服务器 node

// 当我访问我自己的 node 服务器时，我可以再发一个请求向别的网站上，请求的结果响应给客户端 =》 代理

let http = require('http')
let server = http.createServer()
let port = 5000

// 请求到来时
server.on('request', function (req, r) {
    http.get({
        host: 'news.baidu.com'
    }, function (res) {
        let arr = []
        res.on('data', function (data) {
            arr.push(data)
        })
        res.on('end', function () {
            let result = Buffer.concat(arr).toString()
            // 匹配百度新闻页面的所有 li，拼接成页面返回
            let arrs = result.match(/<li (?:[\s\S]*?)><\/li>/img)
            r.setHeader('Content-Type', 'text/html;charset=utf8')
            r.end(arrs.join(''))
        })
    })
})

server.listen(port, 'localhost', function () {
    console.log(`server start ${port}`)
})

// 为什么要用 node 做中间层，这样不会慢吗?
// 会慢，前后端分离，前端能够干更多的事

// http相关的
// 1、防盗链（静态服务）
// 2、多语言
// 3、缓存
// 4、断点续传
// 5、压缩 gzip
// 6、实现 http-server 命令行工具 + 发布
// 7、koa框架 koa源码 中间件

// puppeteer