// loader 是一个普通的函数 模块
// loader的作用就是把源码进行转化

function loader(source) {
    console.log('loader1')
    // 最终的这个 loader 只能返回 js 脚本
    return source
}

loader.pitch = function () {
    console.log('loader1 pitch~~~')
}

module.exports = loader