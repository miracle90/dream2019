let express = require('express')

let app = express()

// 可以使用 express 中间件，来处理相同的逻辑
// 中间件特点：
// 1、决定是否向下执行
// 2、扩展 req，res 属性
// 3、常见的权限校验
// cookie 中的 path 是一样的

// 不写，所有中间件都会执行
app.use(function (req, res, next) {
    let arr = []
    req.on('data', function (data) {
        arr.push(data)
    })
    req.on('end', function () {
        // 直接扩展 req
        req.body = require('querystring').parse(Buffer.concat(arr).toString())
        // 异步，放在 on('end') 中
        // next 中传参，会被解释成错误
        next('xxx')
    })
    // 默认不会向下走，所有路径不匹配才会报 404
    // next()
})

// app.get('/', function (req, res) {
//     console.log(req.a)
// })
app.post('/login', function (req, res) {
    console.log(req.body)
})
app.post('/reg', function (req, res) {
    
})

// 下方，错误处理中间件，四个参数
app.use(function (error, req, res, next) {
    console.log('error ', error)
})
app.listen(3000)