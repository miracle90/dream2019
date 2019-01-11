let http = require('http')
let uuid = require('uuid')
let queryString = require('querystring')

// 生成一个唯一的卡号
let id = uuid.v4()

// 内存空间，持久化，存在redis/mongo
let session = {}

// 给用户设置一个 cookie
let cardName = 'connect.sid'

http.createServer((req, res) => {
    // 拿到所有的 cookie
    let cookies = queryString.parse(req.headers['cookie'], '; ')
    let uid = cookies[cardName]
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    if (uid) {
        if (session[uid]) {
            session[uid].m -= 1000
            res.end(`您好，消费成功，卡中余额${session[uid].m}元`)
        } else {
            res.setHeader('Set-Cookie', `${cardName}=${id}`)
            // 关联 session
            session[id] = {
                m: 10000
            }
            res.end(`您好，充值成功，卡中余额10000元`)
        }
    } else {
        // 设置 cookie
        res.setHeader('Set-Cookie', `${cardName}=${id}`)
        // 关联 session
        session[id] = {
            m: 10000
        }
        res.end(`您好，充值成功，卡中余额10000元`)
    }
}).listen(3000)