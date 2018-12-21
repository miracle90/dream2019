// loader-utils 主要来获取参数 转化路径
let loaderUtils = require('loader-utils')
let babel = require('@babel/core')         // babel 核心模块

function loader(source) {
    let options = loaderUtils.getOptions(this)
    let cb = this.async()       // 此方法是异步的，你不调用 callback 就不会继续执行
    babel.transform(source, {
        ...options,
        sourceMap: true,        // 为了调试使用
        filename: this.resoucePath.split('/').pop()
    }, function (err, res) {
        // res 里有转化后的代码
        // 回调里传递的参数，第一个是 err，第二个是转化后的代码，第三个源码的sourceMap
        cb(err, res.code, res.map)        // tapable
    })
    // return source
}

module.exports = loader
