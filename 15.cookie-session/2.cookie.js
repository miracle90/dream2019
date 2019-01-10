let http = require('http')
let crypto = require('crypto')
let queryString = require('querystring')

http.createServer((req, res) => {
    let cookies = req.headers['cookie']
    req.cookies = queryString.parse(cookies, '; ', '=')
    req.signedCookie = function (key) {
        console.log(req.cookies)
        let [k, sign] = (req.cookies[key] || '').split('.')
        let newSign = crypto.createHmac('sha256', 'lyy').update(k).digest('base64').replace(/\+/g, '')
        if (newSign === sign) {
            return k
        } else {
            return 'cookie change'
        }
    }

    let arr = []
    res.setCookie = function (key, value, opts = {}) {
        if (opts.signed) {
            value = value + '.' + crypto.createHmac('sha256', 'lyy').update(value).digest('base64').replace(/\+/g, '')
        }
        let str = `${key}=${value}`
        if (opts.maxAge) {
            str += `; max-age=${opts.maxAge}`
        }
        if (opts.httpOnly) {
            str += `; httpOnly`
        }
        arr.push(str)
        res.setHeader('Set-Cookie', arr)
    }
    
    if (req.url === '/read') {
        res.end(req.signedCookie('name'))
    }
    if (req.url === '/write') {
        res.setCookie('name', 'lyy', {httpOnly: true, signed: true})
        res.setCookie('age', '28', {httpOnly: true})
        res.end('ok')
    }
    if (req.url = '/visit') {
        let visit = 0
        // 用户访问了服务器多少次
        // cookie暴露在客户端，不能用来存放密码
        if (req.cookies.visit) {
            visit = ++req.cookies.visit
        } else {
            // 之前没有访问过
            visit = 1
        }
        res.setCookie('visit', visit)
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(`你是第${visit}次访问`)
    }
    res.end('hello world')
}).listen(3000)

// session 相对 cookie 比较安全 保存在服务端的 基于cookie