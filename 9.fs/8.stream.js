// stream 流，是有方向的，有开始位置和结束为止

// socket tcp
// http req res 都是基于流的
// 压缩 流
// 文件操作

// 流的类型：可读流、可写流、可读可写（双工流 duplext）、转换流（transform流）

let fs = require('fs')
let path = require('path')

// 创建一个可读流，基于文件操作
// 默认创建流不会把内容读取出来
let rs =  fs.createReadStream(path.resolve(__dirname, 'a.txt'), {
    flags: 'r',                 // 操作文件的方式，在内部 fs.open(flags, mode)
    encoding: null,             // 读取出的编码格式，默认就是buffer
    mode: 0o666,                // 权限
    autoClose: true,            // 读取完毕后，是否调用 fs.close 方法
    start: 0,                   // fs.read(position)
    end: 5,                     // 0-3 是4个，包前又包后
    highWaterMark: 3            // 每次读取多少个，默认64k
})

// 默认我们创建的流，叫非流动模式 => 流动模式
// 流是基于事件的 EventEmitter 内置，内部会监控用户是否监听了 on('data') 事件
// newListener 可以监控用户是否监听了 data 事件，在内部可以发射这个事件
// 内部调用 fs.read() 把读取的结果通过 rs.emit('结果')，不停的读取直到文件读完为止

let arr = []
rs.on('open', function (fd) {
    // 文件描述符
    // 前三个被占用
    // 标准输入 0
    // 标准输出 1 console.log()
    // 错误输出 2 console.error()
    // 默认从3开始
    console.log(fd)
})
rs.on('data', function (data) {
    console.log(data)
    rs.pause()
    arr.push(data)
    console.log(arr)
})

// 文件读取完毕后，会触发 end 方法
rs.on('end', function () {
    console.log(Buffer.concat(arr).toString())
})

rs.on('close', function () {
    console.log('close')
})

rs.on('error', function (err) {
    console.log('err ', err)
})

// 可读流可以实现 暂停（暂停触发 on('data')）和恢复（恢复触发 on('data')）
setTimeout(() => {
    rs.resume()
}, 1000);

// rs.on('data')
// rs.on('end')
// rs.on('err')
// rs.on('open')
// rs.on('close')
// rs.pause()
// rs.resume()