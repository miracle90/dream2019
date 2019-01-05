let express = require('express')
let bodyParse = require('body-parser')
let app = express()

// 处理JSON格式的请求体
app.use(bodyParse.json())
// 处理表单格式的请求体
app.use(bodyParse.urlencoded({extended: true}))

app.post('/post', function (req, res) {
    let body = req.body
    res.send(body)
})

app.post('/post', function (req, res) {
    let body = req.body
    res.send(body)
})

app.listen(8080)