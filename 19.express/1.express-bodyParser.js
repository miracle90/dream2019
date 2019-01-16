let express = require('express')
let bodyParser = require('body-parser')
let person = require('./person')

let app = express()

// function bodyParser() {}
// bodyParser.urlencoded = function () {
//     return function (req, res, next) {
//         if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
//             let arr = []
//             req.on('data', function (data) {
//                 arr.push(data)
//             })
//             req.on('end', function () {
//                 let str = Buffer.concat(arr).toString()
//                 let body = require('querystring').parse(str)
//                 req.body = body
//                 next()
//             })
//         } else {
//             next()
//         }
//     }
// }
// bodyParser.json = function () {
//     return function (req, res, next) {
//         if (req.headers['content-type'] === 'application/json') {
//             let arr = []
//             req.on('data', function (data) {
//                 arr.push(data)
//             })
//             req.on('end', function () {
//                 let str = Buffer.concat(arr).toString()
//                 let body = JSON.parse(str)
//                 req.body = body
//                 next()
//             })
//         } else {
//             next()
//         }
//     }
// }
// 处理表单
app.use(bodyParser.urlencoded({extended: false}))
// 处理json
app.use(bodyParser.json())

app.use('/person', person)

// koa-router 二级路由
// app.get('/', function (req, res) {
//     res.send('首页')
// })

app.post('/login', function (req, res) {
    console.log(req.body)
    res.send('首页')
})

// multer 文件上传
// body-parser 解析请求体
app.listen(3000)