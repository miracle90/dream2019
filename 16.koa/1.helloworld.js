let Koa = require('koa')

// 实例
let app = new Koa()

// listen 监听端口的
// use 实现中间件

// 默认返回结果，表示文件找不到
app.use((ctx, next) => {
    // ctx req/res http.createServer()
    // ctx request/response
})

app.listen(3000)
