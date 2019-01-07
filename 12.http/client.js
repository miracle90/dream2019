let http = require('http')
// 建立客户端，有 get request

// 可以做爬虫、中间件
let client = http.request({
    method: 'POST',
    hostname: 'localhost',
    path: '/a=1#top',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    port: 3000
}, function (res) {
    console.log('-----------------')
    console.log('res', res.headers)
    // 拿到响应体
    res.on('data', function (chunk) {
        console.log(chunk.toString())
    })
})

// 把请求真正的发出
// end方法中可以写入请求体
client.end('name=lyy&age=18')

// req
// req.method
// req.url
// req.headers
// req.on('data')

// res
// res.statusCode = 200
// res.setHeader() 设置响应头
// res.end() 响应结束