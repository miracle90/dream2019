let http = require('http')
let methods = require('methods')
let url = require('url')

// 批量产生方法
// console.log(methods)

function Application() {
    function app(req, res) {
        // 请求路径，请求方法
        let {pathname} = url.parse(req.url, true)
        let method = req.method.toLowerCase()
        for (let i = 0; i < app.routes.length; i++) {
            let layer = app.routes[i]
            let {method: m, path, cb} = layer
            // 如果有 params，这个路由是路径参数
            if (layer.params) {
                // 如果 /user/lyy/18 匹配 /\/user\/([^\/]*)\/([^\/]*)/
                if (path.test(pathname)) {
                    // 匹配到了，说明路径已经匹配到了，取出参数
                    let [, ...args] = pathname.match(path)
                    // 使用 reduce 赋值给 req.params
                    req.params = layer.params.reduce((memo, key, index) => {
                        memo[key] = args[index]
                        return memo
                    }, {})
                    return cb(req, res)
                }
            }
            if ((method === m || m === 'all') && (path === pathname || path === '*')) {
                return cb(req, res)
            }
        }
        res.end(`Cannot ${method} ${pathname}`)
    }
    // 存放所有请求的信息
    app.routes = []
    methods = [...methods, 'all']
    methods.forEach(method => {
        app[method] = function (path, cb) {
            let layer = {
                method,
                path,
                cb
            }
            // 有冒号表示是一个路径参数路由
            if (path.includes(':')) {
                // 存放 : 后面的key值的数组
                layer.params = []
                // /user/:name/:id   转化成 =>   /\/user\/([^\/]*)\/([^\/]*)/
                layer.path = new RegExp(path.replace(/:([^\/]*)/g, function () {
                    layer.params.push(arguments[1])
                    return '([^\/]*)'
                }))
            }
            app.routes.push(layer)
        }
    })
    app.listen = function (...args) {
        let server = http.createServer(app)
        server.listen(...args)
    }
    return app
}

module.exports = Application