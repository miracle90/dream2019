let express = require('express')
// let 
let person = require('./person')

let app = express()

function bodyParser() {
    return function () {
        
    }
}

app.use(bodyParser())

app.use('/person', person)

// koa-router 二级路由
app.get('/', function (req, res) {
    res.send('首页')
})

app.post('/login', function (req, res) {
    
})

// multer 文件上传
// body-parser 解析请求体

app.listen(3000)