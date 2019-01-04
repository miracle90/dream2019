// 写是有缓存区的概念的，写的时候比较复杂
let fs = require('fs')
let path = require('path')

// 可写流 write end
let ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {
    flags: 'w',                 // 当前操作是写的状态
    encoding: 'utf8',           // 默认写入的编码是 utf8
    mode: 0o666,
    autoClose: true,
    start: 0,                   // 写入文件的位置
    highWaterMark: 2            // 希望用的缓存区的大小，默认16k
})

// 写入的内容必须是 buffer 或者字符串
// 用写入的个数和 highWaterMark 比较
let flag = ws.write('a', 'utf8', function () {
    console.log('写入成功')
})
console.log(flag)

// 结合了 write 方法 + close 方法
// 已经关闭了就不能再写入
// 把内存中的东西强制写入到文件中，并且把遗言也写入进去，之后关闭文件
ws.end('结束')