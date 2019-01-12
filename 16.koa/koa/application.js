let http = require('http')
let path = require('path')
let fs = require('fs')
let context = require('./context')
let request = require('./request')
let response = require('./response')
let EventEmitter = require('events')
let Stream = require('stream')

class Koa extends EventEmitter{
    constructor () {
        super()
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
    // 组合方法
    compose (middlewares, ctx) {
        function dispatch(i) {
            // 如果没有注册中间件，需要返回一个成功的 Promise
            if (i === middlewares.length) return Promise.resolve()
            let middleware = middlewares[i]
            // 让第一个函数执行完，如果有异步，看有没有 await
            return Promise.resolve(middleware(ctx, () => dispatch(i + 1)))
        }
        return dispatch(0)
    }
    // 处理用户请求到来时
    handleRequest (req, res) {
        let ctx = this.createContext(req, res)
        // 默认返回 404，没有调用 ctx.body
        res.statusCode = 404
        let fn = this.compose(this.middlewares, ctx)

        // 把所有的函数进行组合，当组合的函数执行成功后，把最终的结果进行响应
        fn.then(() => {
            // this.middleware(ctx)
            // 当中间件函数执行完之后，需要结束掉响应 res.end()
            if (!ctx.body) {
                res.end('Not Found')
            } else if (ctx.body instanceof Stream) {
                // 如果是个流
                res.setHeader('Conent-Type', 'text/html;charset=utf-8')
                ctx.body.pipe(res)
            } else if (typeof ctx.body === 'object') {
                // 如果是对象，转成 json
                res.setHeader('Content-Type', 'application/json;charset=utf-8')
                res.end(JSON.stringify(ctx.body))
            } else {
                res.end(ctx.body)
            }
        }).catch(err => {
            this.emit('error', err)
        })
    }
    listen (...args) {
        // 启动服务
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}

module.exports = Koa