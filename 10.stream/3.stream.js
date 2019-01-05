// let fs = require('fs')
let path = require('path')
let WriteStream = require('./writeStream')

let ws = new WriteStream(path.resolve(__dirname, 'b.txt'), {
    flags: 'w',             // 当前操作是写的状态
    encoding: 'utf8',       // 默认写入的编码是 utf8
    mode: 0o666,
    autoClose: true,
    start: 0,               // 写入文件的位置
    highWaterMark: 3        // 希望用的缓存区的大小，默认16k
})

// 现在要向文件中写入10个数
let i = 9
let flag
function write() {
    flag = true
    while (flag && i >= 0) {
        flag = ws.write(i-- + '')
        // console.log(flag)
    }
}

// 抽干，达到预期后，内容被清空，就会执行 drain 方法
ws.on('drain', function () {
    console.log('抽干')
    write()
})
write()