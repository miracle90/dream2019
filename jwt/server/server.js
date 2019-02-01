const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const moment = require('moment')

const app = express()
const JWT_SECRET = 'lyy'
const users = []

app.use(bodyParser.json())
// 注册
app.post('/signup', function(req, res) {
    let user = req.body
    users.push(user)
    res.json(user)
})
// 登录
app.get('/signin', function(req, res) {
    let user = req.body
    let oldUser = users.find(item => user.username === item.username && user.password === item.password)
    if (oldUser) {
        // 生成过期时间，得到距离当前时间7天后的时间
        let exp = moment().add(7, 'days').valueOf()
        // 生成 token
        let token = jwt.encode({
            user: oldUser,
            exp
        }, JWT_SECRET)
        res.json({
            code: 0,
            data: token
        })
    } else {
        res.json({
            code: 1,
            error: '登录失败'
        })
    }
})
// 访问 /user 的时候，要把用户信息解开返回
app.get('/user', function(req, res) {
    let authorization = req.headers['authorization']
    let token = authorization.split(' ')[1]
    let result = jwt.decode(token, JWT_SECRET)
    res.json({
        code: 0,
        data: result.user
    })
})

app.listen(8080)

// 加密：
// 头：base64urlEncode
// 负载：头：base64urlEncode
// 签名：crypto.createHmac('sha256', key).update(input).digest('base64');

// 解密：
// 头：base64urlDecode
// 负载：头：base64urlDecode
// 校验签名是否正确，已经是否过期

// 头部 + 负载（内容） + 签名
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibHl5IiwicGFzc3dvcmQiOiIxMjMxMjMifSwiZXhwIjoxNTQ5NjA4ODA2ODI4fQ.PDCq6DdRZ4x9_6XRiLol3adBIMC0wf3XaAGCyZb7kl8

// 单点登录
// 生成 token，在数据库中记录
// 再次登录，生成新的 token

// https防止明文被截取