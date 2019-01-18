// 符合 commonjs 模块规范，Node 不支持 es6 模块化
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    // entry: './src/index.js',
    // 多入口
    entry: {
        app: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 出口取入口的名字
        filename: '[name].[hash:8].js'
    },
    devServer: {
        port: 3000,
        progress: true,
        compress: true,
        // 以 dist 为静态目录，默认当前项目的根目录
        // contentBase: './dist',
        // 是否新打开浏览器
        open: false
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['app']
        }),
        // 多入口，插件用 n 次，并且配置 chunks 选项
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'login.html',
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['app', 'login']
        })
    ]
}