let http = require('http')
let path = require('path')
let fs = require('fs')

class Koa {
    constructor () {
        this.middleware
    }
    // 注册中间件的方法
    use (fn) {
        this.middleware = fn
    }
    listen (...args) {
        // 启动服务
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}

module.exports = Koa