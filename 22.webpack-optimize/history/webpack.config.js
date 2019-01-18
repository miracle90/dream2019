let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    // 监听打包
    watch: true,
    watchOptions: {
        // 轮询，以秒为单位
        poll: 1000,
        // 防抖：不停的触发事件，只执行一次，验证码倒计时 60 => 59 => 58
        // 节流：一段时间执行一次
        // 滚动条，滚动的时候不执行，一停就执行 => 防抖
        // 滚动条，滚动的时候，一段时间执行一次 => 节流
        aggregateTimeout: 2000,
        ignored: /node_modules/
    },
    // 告诉 webpack 生成一个 map，会标识源码中哪行哪列出错了
    devtool: 'source-map',
    // 简版，在文件中，不能定位到列
    // devtool: 'cheap-module-eval-source-map',
    // 简版，但不在文件里
    // devtool: 'cheap-module-source-map',
    // 当前打包的js文件中
    // devtool: 'eval-source-map',
    devServer: {
        port: 3000,
        progress: true,
        // compress: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),        // 只解析 src 目录下
                exclude: /node_modules/,                        // 不解析 node_modules 目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'               // react jsx 语法解析
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
}