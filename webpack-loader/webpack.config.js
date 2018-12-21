let path = require('path')
// 1、写成绝对路径
// 2、配置成快捷方法（别名）
// 3、在 resolveLoader 下配置 module 查找路径
// 4、npm link
// 5、发布到npm

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    // resolve mainFiles alias module 模块的查找路径
    // 解析loader
    resolveLoader: {
        modules: [path.resolve(__dirname, 'loaders', 'loader1.js'), 'node_modules']
        // alias: {
        //     loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
        // }
    },
    watch: true,
    devtool: 'source-map', // 显示源码
    module: {
        // 一个文件可以配置n个loader loader 执行关系
        // style-loader css-loader less-loader
        // loader 默认从右往左执行
        // 从下往上执行
        // loader有几种方式，pre 前置 loader，post 后置 loader，normalLoader
        // 每个 loader 分两部分，我们说的倒着的都是普通的 loader 还有 pitch loader
        reules: [
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader', // 把图片打包到dist目录下
                    options: {
                        limit: 200*1024
                    }
                }
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'less-loader']
            },
            {
                test: /\.jpg$/,
                use: 'file-loader'      // 把图片打包到dist目录下
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'banner-loader',     // 希望加一个注释
                    options: {
                        text: 'lyy',
                        filename: path.resolve(__dirname, 'banner.txt')
                    }
                }
            }
            // 需要匹配所有的js 用 babel 来转移 @babel/core @babel/preset-env
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // }

            // loader 默认 pre + normal + inline + post
            // {
            //     test: /\.js$/,
            //     use: 'loader1',
            //     enforce: 'pre'
            // },
            // {
            //     test: /\.js$/,
            //     use: 'loader2'
            // },
            // {
            //     test: /\.js$/,
            //     use: 'loader3',
            //     enforce: 'post'
            // }
            // {
            //     test: /\.js$/,
            //     use: ['loader3', 'loader2', 'loader1']
            // }
        ]
    }
}