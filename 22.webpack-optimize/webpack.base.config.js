let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
let HappyPack = require('happypack')
// BannerPlugin 版权声明

module.exports = {
    // mode: 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    // 解析，第三方模块解析的规则
    resolve: {
        modules: [path.resolve('node_modules')],
        // // 入口文件的配置
        // mainFiles: ['a.js', 'index.js'],
        // // 如果字段的配置
        // mainFields: ['style', 'main'],
        // 入口别名
        alias: {
            'bootstrap': 'bootstrap/dist/css/bootstrap.css'
        },
        // 扩展名，找的优先级 js => json => css
        extensions: ['.js', '.json', '.css']
    },
    // 监听打包
    // watch: true,
    // watchOptions: {
    //     // 轮询，以秒为单位
    //     poll: 1000,
    //     // 防抖：不停的触发事件，只执行一次，验证码倒计时 60 => 59 => 58
    //     // 节流：一段时间执行一次
    //     // 滚动条，滚动的时候不执行，一停就执行 => 防抖
    //     // 滚动条，滚动的时候，一段时间执行一次 => 节流
    //     aggregateTimeout: 2000,
    //     ignored: /node_modules/
    // },
    // 告诉 webpack 生成一个 map，会标识源码中哪行哪列出错了
    devtool: 'source-map',
    // 简版，在文件中，不能定位到列
    // devtool: 'cheap-module-eval-source-map',
    // 简版，但不在文件里
    // devtool: 'cheap-module-source-map',
    // 当前打包的js文件中
    // devtool: 'eval-source-map',
    devServer: {
        // 默认 webpack-dev-server 启动的时候，会调用 before 钩子 => after，mock 数据
        // before (app) {
        //     // app 是 express()
        //     app.get('/api/user', function (req, res) {
        //         res.json({
        //             name: 'mock 数据'
        //         })
        //     })
        // },
        // 端口
        port: 8080,
        // 进度条
        progress: true,
        // 压缩
        // compress: true,
        // 代理，前端还可以使用 nginx 实现代理
        proxy: {
            // 以 /api 开头，代理到 http://localhost:3000
            // '/api': 'http://localhost:3000'
            // 请求的时 /api/user 到服务器是 /user 了
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    module: {
        // 如果确定没有依赖，写在这里，webpack 不做模块依赖查找，提高打包速率
        noParse: /jquery/,
        rules: [
            {
                test: /\.css$/,
                use: 'HappyPack/loader?id=css',
                // use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),        // 只解析 src 目录下
                exclude: /node_modules/,                        // 不解析 node_modules 目录
                use: 'HappyPack/loader?id=js',
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: [
                //             '@babel/preset-env',
                //             '@babel/preset-react'               // react jsx 语法解析
                //         ]
                //     }
                // }
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'css',
            use: ['style-loader', 'css-loader'],
        }),
        new HappyPack({
            id: 'js',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react' // react jsx 语法解析
                    ]
                }
            }]
        }),
        // 如果发现 moment 中引入了 locale，忽略掉，就不会打包
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.DefinePlugin({
            // 定义的变量，需要用 JSON.stringify 包裹
            // 定义的变量在全局上
            DEV: JSON.stringify('development'),
            EXPRESSION: '1+1',
            FLAG: 'true'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        // 开发环境下清空指定目录
        new CleanWebpackPlugin(['dist']),
        // 拷贝静态资源插件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'assets'),
                to: 'assets',
                ignore: ['.*']
            }
        ]),
        new webpack.BannerPlugin('make by lyy in 2019')
    ]
}

// webpack 实现代理
// webpack-dev-server 利用了 express

// 用 node 在后台来启动我们的 webpack

// 跨域解决方法：
// 1、后台配置白名单 cors
// 2、代理 => webpack 配置 DevServer 的 before 钩子
// 3、服务端启动 webpack

// new webpack.DefinePlugin()
// 测试环境
// 上线环境

// 配置开发环境、测试环境、生产环境