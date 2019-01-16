let express = require('./express')
let path = require('path')

// 监听函数
let app = express()

// 内置了中间件
app.use(express.static(__dirname))

// 中间件特点：
// 1、决定是否向下执行
// 2、扩展 req，res 属性
// 3、常见的权限校验

// app.use(function (req, res, next) {
//     res.send = function () {
        
//     }
//     next()
// })

// 中间件只要开头匹配就可以匹配上
app.use('/', function (req, res, next) {
    console.log(1)
    next('出错了')
})
app.use(function (req, res, next) {
    console.log(2)
    next()
})
// 错误处理中间件，一般在路由下方，参数是4个
app.use(function (err, req, res, next) {
    // console.log(err)
    // res.send(404)
    console.log(req.path)
    console.log(req.query)
    res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.listen(3000)

// koa-static 判断是否为静态文件

// bodyParser cookie-parser express-session 二级路由