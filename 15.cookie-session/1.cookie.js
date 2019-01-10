// cookie 存储 4k（每次发请求的时候都会带上 cookie）鉴权、jwt模式
// localStorage 5M（只存在浏览器上）

// cookie：安全问题 => 签名算法
// session：基于cookie的，存在服务器上
// localStorage
// sessionStorage：浏览器关掉就没了

// 设置 cookie
// 1、浏览器设置
// 2、服务端设置

// 域名、路径、存活时间、HTTP（服务端设置的cookie不能更改）

let http = require('http')
let queryString = require('querystring')

// 1、默认 cookie 只对当前域名生效 cookie不能跨域（cookie 不能给不同的域设置 cookie）
// 2、一级和二级域名可以共用 cookie（需要配置）
// 3、expires 绝对时间
// 4、max-age 失效时长
// 5、domain
// 6、path
// 7、httpOnly 前端不能获取服务端设置的 cookie，可以再 Application 中更改。。。

http.createServer((req, res) => {
    // 设置 cookie 和读取 cookie 的方法
    req.cookies = queryString.parse(req.headers['cookie'], '; ', '=')
    let arr = []
    res.setCookie = function (key, value, opts = {}) {
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
        // 读取 cookie
        res.end(req.cookies.name, req.cookies.age)
        // res.end(req.headers['cookie'])
    }
    if (req.url === '/write') {
        // 写入 cookie，多个使用数组方式
        // res.setHeader('Set-Cookie', ['name=lyy; max-age=10; domain=localhost; path=/', 'age=18'])
        // res.setHeader('Set-Cookie', 'name=lyy; httpOnly')
        res.setCookie('name', 'lyy', {httpOnly: true})
        res.setCookie('age', '28', {httpOnly: true})
        res.end('ok')
    }
    res.end('hello world')
}).listen(3000)