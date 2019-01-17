// 默认配置文件名称叫 webpack.config.js
// 如果想配置文件名称   =>   npx webpack --config webpack.config1.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 模式：开发 or 生产
    mode: 'development',
    // 入口，相对路径，相对自己
    entry: './src/index.js',
    // 出口，路径必须是绝对路径
    output: {
        // 路径，绝对路径
        path: path.resolve(__dirname, 'dist'),
        // 名字，每次打包产生一个 8 位的 hash 戳
        filename: 'bundle.[hash:8].js'
    },
    // 开发服务配置，配置 webpack-dev-server，默认打包是在内存中，不会产生文件
    devServer: {
        // 端口
        port: 3000,
        // 进度条
        progress: true,
        // contentBase: false,
        // gzip 压缩
        compress: true      // createGzip
    },
    // 对模块进行配置，loader 的作用，可以转化代码，css => 模块型的代码
    module: {
        // 匹配的规则
        rules: [
            // loader 默认写的时候，默认从右向左
            // loader 特点：简单，一个 loader 只处理一种模块
            // css-loader 转换成结果
            // style-loader 插入到 style 标签中
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    // 使用 babel-loader，可以不用写 .babelrc
                    options: {
                        "presets": ["@babel/preset-env"],
                        // es7 语法插件
                        "plugins": [
                            // ["@babel/plugin-proposal-class-properties"], 
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 模板
            template: './src/index.html',
            // 打包后的文件名称，会被放到 dist 目录下
            filename: 'index.html',
            minify: {
                // 清楚属性引号
                removeAttributeQuotes: true,
                // 打成一行
                collapseWhitespace: true,
                // 清楚注释
                removeComments: true
            },
            // 在引用资源路径后面加上 hash，防止缓存
            hash: true
        })
    ]
}