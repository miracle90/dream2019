// let fs = require('fs')
let path = require('path')
let ReadStream = require('./readStream')

let rs = new ReadStream(path.resolve(__dirname, 'a.txt'), {
    flags: 'r', // 操作文件的方式，在内部 fs.open(flags, mode)
    encoding: null, // 读取出的编码格式，默认就是buffer
    mode: 0o666, // 权限
    autoClose: true, // 读取完毕后，是否调用 fs.close 方法
    start: 0, // fs.read(position)
    end: 5, // 0-3 是4个，包前又包后
    highWaterMark: 3 // 每次读取多少个，默认64k
})

let arr = []
rs.on('open', function (fd) {
    console.log('open ', fd)
})
rs.on('data', function (data) {
    console.log(data)
    // rs.pause()
    arr.push(data)
    console.log(arr)
})
rs.on('end', function () {
    console.log(Buffer.concat(arr).toString())
})
rs.on('close', function () {
    console.log('close')
})
rs.on('error', function (err) {
    console.log('err ', err)
})
// setTimeout(() => {
//     rs.resume()
// }, 1000);
