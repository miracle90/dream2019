class KoaRouter {
    constructor () {
        this.middlewares = []
    }
    get (path, cb) {
        this.middlewares.push({
            path,
            cb
        })
    }
    compose(routers, ctx, next) {
        function dispatch(i) {
            if (i === routers.length) return next()
            let router = routers[i].cb
            router(ctx, () => dispatch(i + 1))
        }
        dispatch(0)
    }
    routes () {
        return async (ctx, next) => {
            // 请求路径
            let pathname = ctx.path
            let routers = this.middlewares.filter(item => item.path === pathname)
            // routers 是过滤出来的路径相同的路由
            // 当越界时，调用下一个中间件
            this.compose(routers, ctx, next)
        }
    }
}

module.exports = KoaRouter