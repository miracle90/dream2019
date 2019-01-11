let http = require('http')
let path = require('path')
let fs = require('fs')
let context = require('./context')
let request = require('./request')
let response = require('./response')

class Koa {
    constructor () {
        this.middleware
        // Object.create 创建对象，并且把方法写在原型上，避免污染原对象
        // Object.create(null)，没有原型的对象
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middlewares = []
    }
    // 注册中间件的方法
    use (fn) {
        this.middlewares.push(fn)
    }
    // 创建上下文，自己封装 request response 属性
    createContext (req, res) {
        let ctx = this.context
        // 请求相关
        ctx.request = this.request
        ctx.req = ctx.request.req = req
        // 响应相关
        ctx.response = this.response
        ctx.res = ctx.response.res = res
        return ctx
    }
    // 处理用户请求到来时
    handleRequest (req, res) {
        let ctx = this.createContext(req, res)
        let fn = this.compose(this.middlewares, ctx)

        // this.middleware(ctx)
        // 当中间件函数执行完之后，需要结束掉响应 res.end()
        res.end(ctx.body)
    }
    listen (...args) {
        // 启动服务
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}

module.exports = Koa