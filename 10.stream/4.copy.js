let fs = require('fs')
let path = require('path')

let ReadStream = require('./readStream')
let WriteStream = require('./writeStream')

// 这种方式看不到当前 a.txt 内容的，会默认先读取4b，往 b.txt 中写入
// let rs = fs.createReadStream(path.resolve(__dirname, 'a.txt'), {highWaterMark: 4})
// let ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {highWaterMark: 1})
// rs.pipe(ws)

let rs = new ReadStream(path.resolve(__dirname, 'a.txt'), {highWaterMark: 4})
let ws = new WriteStream(path.resolve(__dirname, 'b.txt'), {highWaterMark: 1})
rs.pipe(ws)


// rs.on('data', function (chunk) {
//     let flag = ws.write(chunk)
//     console.log(flag)
//     if (!flag) {
//         rs.pause()
//     }
// })

// ws.on('drain', function () {
//     rs.resume()
// })