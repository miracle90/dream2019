let http = require('http')
let methods = require('methods')
let url = require('url')
let fs = require('fs')
let path = require('path')

// 批量产生方法
// console.log(methods)

function Application() {
    function app(req, res) {
        // 请求路径，请求方法
        let {pathname} = url.parse(req.url, true)
        let method = req.method.toLowerCase()
        let i = 0
        function next(err) {
            if (app.routes.length === i) {
                return res.end(`Cannot ${method} ${pathname}`)
            }
            let layer = app.routes[i++]
            let {
                method: m,
                path,
                cb
            } = layer

            if (err) {
                if (m === 'middleware') {
                    if ((path === '/' || path === pathname || pathname.startsWith(path + '/')) && cb.length === 4) {
                        return cb(err, req, res, next)
                    } else {
                        // 把错误继续带下去
                        next(err)
                    }
                } else {
                    next(err)
                }
            } else {
                // 方法可能有两类，一类是中间件，另一类是普通的路由
                if (m === 'middleware') {
                    // if (err) {

                    // } else {
                    // 中间件特点会匹配路径，如果开头相同就可以匹配
                    if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
                        return cb(req, res, next)
                    } else {
                        next()
                    }
                    // }
                } else {
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
                    next()
                }
            }
        }
        next()
        // for (let i = 0; i < app.routes.length; i++) {
            // let layer = app.routes[i]
            // let {method: m, path, cb} = layer
            // // 如果有 params，这个路由是路径参数
            // if (layer.params) {
            //     // 如果 /user/lyy/18 匹配 /\/user\/([^\/]*)\/([^\/]*)/
            //     if (path.test(pathname)) {
            //         // 匹配到了，说明路径已经匹配到了，取出参数
            //         let [, ...args] = pathname.match(path)
            //         // 使用 reduce 赋值给 req.params
            //         req.params = layer.params.reduce((memo, key, index) => {
            //             memo[key] = args[index]
            //             return memo
            //         }, {})
            //         return cb(req, res)
            //     }
            // }
            // if ((method === m || m === 'all') && (path === pathname || path === '*')) {
            //     return cb(req, res)
            // }
        // }
        res.end(`Cannot ${method} ${pathname}`)
    }
    // 存放所有请求的信息
    app.routes = []

    // 中间件先调用，路由在后面
    app.use = function (path, cb) {
        if (typeof cb !== 'function') {
            cb = path
            path = '/'
        }
        let layer = {
            method: 'middleware',
            path,
            cb
        }
        app.routes.push(layer)
    };

    [...methods, 'all'].forEach(method => {
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

    // 内置的中间件
    app.use(function (req, res, next) {
        let { pathname, query } = url.parse(req.url, true)
        req.path = pathname
        req.query = query
        res.sendFile = function (url) {
            fs.createReadStream(url).pipe(res)
        }
        res.send = function (val) {
            if (typeof val === 'string' || Buffer.isBuffer(val)) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8')
                res.end(val)
            } else if (typeof val === 'object') {
                res.setHeader('Content-Type', 'application/json;charset=utf-8')
                res.end(JSON.stringify(val))
            } else if (typeof val === Number) {
                res.statusCode = val
                res.end(require('_http_server').STATUS_CODES[val])
            }
        }
        next()
    })

    return app
}

// 返回一个函数
Application.static = function (pathname) {
    return function (req, res, next) {
        let realPath = path.join(pathname, req.path)
        fs.stat(realPath, function (err, statObj) {
            if (err) {
                next()
            } else {
                if (statObj.isDirectory()) {
                    // todo
                } else {
                    res.sendFile(realPath)
                }
            }
        })
    }
}

module.exports = Application