// let express = require('express')
let express = require('./express')

// express 内置了路由中间件
// express.Router()

// express是一个函数，app是一个监听函数，req、res就是原生的请求、响应
let app = express()

// 路径参数路由，在路径中写参数 /user/:name/:id 这个路径表示 /user 后面名字随意但必须要有两项
// req.params

app.get('/user/:name/:id', function (req, res) {
    res.end(JSON.stringify(req.params))
})

app.get('/', function (req, res) {
    res.end('home')
})
app.post('/', function (req, res) {
    res.end('post home')
})
// all 匹配所有方法，* 匹配所有路径
app.all('*', function (req, res) {
    res.end('all or * end')
})

app.listen(3000)