// 符合 commonjs 模块规范，Node 不支持 es6 模块化
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    // entry: './src/index.js',
    // 多入口
    entry: {
        app: './src/index.js',
        // 把 jquery 单独打成一个包
        // jquery: 'jquery'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 出口取入口的名字
        filename: '[name].[hash:8].js',
        // chunks: ['app', 'jquery']
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
    // 外部变量，不会打包
    // externals: {
    //     'jquery': '$'
    // },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                // use: 'file-loader'
                // url-loader 可以传递一个参数，limit 限制，如果在限制之内，内容会变成 base64，如果大于限制，会使用 file-loader
                use: {
                    loader: 'url-loader',
                    options: {
                        // 200k
                        limit: 500 * 1024
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            // {
            //     // 将 jquery 暴露到 window 上
            //     // 只要引用到 jquery 就会触发
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },
            // loader 的写法，[] '' {}
            // loader 的分类 preloader normalLoader postLoader
            // 预编译器 less less-loader / sass node-sass sass-loader / stylus stylus-loader
            // 抽离 css 样式，变成 link href 的形式 mini-css-extract-plugin
            // 自动加兼容性前缀 postcss-loader，调用 autoprefixer，需要配置 postcss.config.js
            // autoprefixer 自动加前缀
            // es6 以及更高级的语法转换成 es5，Promise、Generator 等 API 转不了
            // babel-loader 处理文件，它会自己调用 babel 核心包 =>
            // @babel/core 需要很多插件 =>
            // @babel/preset-env
            // 代码校验，eslint，用法非常像 less，必须在前面执行
            // {
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     use: 'eslint-loader'
            // },
            {
                test: /\.js$/,
                // 排除查找 node_modules 目录
                exclude: /node_modules/,
                // 在 src 下面找
                // include: path.resolve('src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        // 有一些不支持的，需要 plugins
                        // 转化 js 运行时的 api，并且优化js，抽离公共部分
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
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
        new webpack.ProvidePlugin({
            // 这个 $ 并不是全局的
            '$': 'jquery'
        }),
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