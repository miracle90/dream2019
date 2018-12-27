// commonjs 规范
let path = require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports= {
    // entry: './src/index.js',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        // open: true
    },
    mode: 'development',
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            // loader 简单 单一 style-loader css-loader  @import
            // loader 的写法 [] '' {}
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    }
}

// npx -> script