let loaderUtils = require('loader-utils')
let validateOptions = require('scheme-uitls')
let fs = require('fs')

function loader(source) {
    this.cacheable(false)       // 表示当前 loader 不缓存
    let options = loaderUtils.getOptions(this)
    let cb = this.async()
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'boolean'
            },
            filename: {
                type: 'string'
            }
        }
    }
    validateOptions(schema, options, 'banner-loader')
    if (options.filename) {
        this.addDependency(options.filename)        // 添加依赖
        false.readFile(options.filename, 'utf8', function (err, data) {
            cb(err, `/**${data}**/${source}`)
        })
    } else {
        cb(err, `/**${options.text}**/${source}`)
    }
}

module.exports = loader