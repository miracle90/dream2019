let http = require('http')
let url = require('url')

let server = http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url)
    res.pipe(ws)
    req.on('data', function () {      // 只有当有请求体的时候才会触发 on data
        console.log('data')
    })
    req.on('end', function () {      // 只有当有请求体的时候才会触发 on data
        console.log('end')
    })
})

server.listen(3000, function (params) {
    console.log('3000 port')
})