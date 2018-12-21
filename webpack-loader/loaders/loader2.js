// loader 是一个普通的函数 模块
// loader的作用就是把源码进行转化

function loader(source) {
    console.log('loader2')
    // 最终的这个 loader 只能返回 js 脚本
    return source
}

module.exports = loader


// babel-loader 用来转化模块
// file-loader 对图片进行打包
// url-loader
// style-loader css-loader less-loader