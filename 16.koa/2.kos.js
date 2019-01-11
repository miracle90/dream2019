// let Koa = require('./koa/application')
let Koa = require('koa')

let app = new Koa()

app.use((ctx) => {
    ctx.body = 'hello1'
})
app.use((ctx) => {
    ctx.body = 'hello2'
})
app.use((ctx) => {
    ctx.body = 'hello3'
})

app.listen(3000)