// 符合 commonjs 模块规范，Node 不支持 es6 模块化
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    // entry: './src/index.js',
    // 多入口
    entry: {
        app: './src/index.js',
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
    // 优化配置，只有模式是生产环境才生效
    optimization: {
        minimizer: [
            // 压缩 js 插件
            new UglifyJsPlugin({
                // 缓存打包，第一次打包可以拿到之前的缓存
                cache: true,
                // 并行打包
                parallel: true,
                sourceMap: true
            }),
            // 压缩 css 插件
            new OptimizeCSSPlugin()
        ]
    },
    module: {
        rules: [
            // loader 的写法，[] '' {}
            // loader 的分类 preloader normalLoader postLoader
            // 预编译器 less less-loader / sass node-sass sass-loader / stylus stylus-loader
            // 抽离 css 样式，变成 link href 的形式 mini-css-extract-plugin
            // 自动加兼容性前缀 postcss-loader，调用 autoprefixer，需要配置 postcss.config.js
            // autoprefixer 自动加前缀
            {
                test: /.\css$/,
                use: MiniCssExtractPlugin.loader,
                // enforce: 'post'
            },
            { 
                test: /\.css$/,
                use: 'css-loader',
                // 默认自下而上执行，enforce: 'pre' 强制先执行
                // enforce: 'pre'
            },
            {
                test: /\.css$/,
                use: 'postcss-loader',
            },
            // {
            //     // css-loader：转化 css，处理 @import
            //     // style-loader：将 css 插入到 html style 标签中
            //     test: /\.css$/,
            //     // use: ['style-loader', 'css-loader']
            //     use: 'style-loader',
            //     // 强制后执行
            //     enforce: 'post'
            // },
            {
                test: /.\less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
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
            },
            hash: true,
            chunks: ['app']
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css'
        })
    ]
}