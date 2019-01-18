let express = require('express')
let webpack = require('webpack')
let config = require('./webpack.config.js')
let WebpackDevMiddleware = require('webpack-dev-middleware')

let app = express()

// 用 webpack 启动配置，编译
let compiler = webpack(config)

// 在服务端启动了 webpack，在后端解决跨域
app.use(WebpackDevMiddleware(compiler))

app.get('/api/user', async (req, res) => {
    console.log(req.path)
    res.json({
        name: 'lyy'
    })
})

app.listen(3000)