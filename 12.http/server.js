// node 为了实现高性能web服务器
let http = require('http')
let queryString = require('querystring')

// req指的是客户端的请求，可读流 on('data')
// res指的是服务端的响应，可写流 write end
let server = http.createServer((req, res) => {
    console.log('--------------- 来客了  ----------------')
    // 监听函数，客户端请求到来后，会执行此回调
    let arr = []
    // 请求方法
    let method = req.method
    console.log(method)
    // 请求链接
    let url = req.url
    console.log(url)
    // 协议版本
    let version = req.httpVersion
    console.log(version)
    // 拿取请求头，所有的 key 都是小写的
    let headers = req.headers
    console.log(headers)
    req.on('data', function (chunk) {
        arr.push(chunk)
    })
    req.on('end', function () {
        // 查询字符串，希望把 a=b&c=d 格式转化成对象格式 {a: b, c: d}
        let str = Buffer.concat(arr).toString()
        let obj
        // 判断是表单还是 json 格式
        if (headers['content-type'] === 'application/x-www-form-urlencoded') {
            obj = queryString.parse(str)
            console.log(obj)
        } else {
            obj = JSON.parse(str)
        }
        // 设置响应行
        res.statusCode = 200
        // 设置响应头
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('a', '1')
        // 把结果返回给客户端，写入响应体
        res.end(JSON.stringify(obj))
    })
})

// server.listen(3000, 'localhost')
// listen EADDRINUSE :::3000 端口被占用
let port = 3000
server.listen(port, function () {
    console.log(`server start ${port}`)
})

server.on('error', function (err) {
    console.log(err)
    if (err.errno === 'EADDRINUSE') {
        port++
        server.listen(port)
    }
})