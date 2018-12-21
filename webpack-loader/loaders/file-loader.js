// url-loader -> file-loader 
// 如果图片在限制内，url-loader 会变成base64

let loaderUtils = require('loader-utils')

function loader(source) {
    // 图片是二进制类型
    console.log(source)
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
        content: source
    })
    this.emitFile(filename, source)     // 把文件发射出来
    return `module.exports="${filename}"`
}
loader.raw = true    // raw 源 buffer 二进制

module.exports = loader