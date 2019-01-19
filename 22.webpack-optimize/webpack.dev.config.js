let base = require('./webpack.base.config')
let merge = require('webpack-merge')

let dev = {
    mode: 'development',
    // resolve: {
    //     modules: [path.resolve('node_modules')],
    //     // // 入口文件的配置
    //     // mainFiles: ['a.js', 'index.js'],
    //     // // 如果字段的配置
    //     // mainFields: ['style', 'main'],
    //     // 入口别名
    //     alias: {
    //         'bootstrap': 'bootstrap/dist/css/bootstrap.css'
    //     },
    //     // 扩展名，找的优先级 js => json => css
    //     extensions: ['.js', '.json', '.css']
    // },
}

module.exports = merge(base, dev)