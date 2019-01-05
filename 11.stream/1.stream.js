// 流 目前最长用
// 可读流 
// 文件操作：fs.open fs.close
// 常用方法：on('data') on('end') on('error')
// pipe() rs.pause() rs.resume()

// 可写流
// ws.write()
// 写入的内容 string or Buffer
// ws.end()
// ws.on('drain')

// let fs = require('fs')
// let path = require('path')
// let Stream = require('stream')
// let rs = fs.createReadStream(path.resolve(__dirname, 'a.txt'))
// console.log(rs instanceof Stream)

// 可读流继承的是 Readable 重写 _read
// 可写流继承的是 Writable 重写 _write

// 双工流
// // fd 1 标准输出
// process.stdout.write('stdout')
// // fd 2
// process.stderr.write('err')
// // fd 0 标准输入 监听过程 可读流
// process.stdin.on('data', function (data) {
//     console.log(data)
// })

let { Duplex, Transform } = require('stream')
// class MyDuplex extends Duplex {
//     // 可能是没关系，也可能是有关系
//     _read () {
//         this.push('hello')
//         this.push(null)
//     }
//     _write (chunk, encoding, clearBuffer) {
//         console.log(chunk)
//         clearBuffer()
//     }
// }
// let my = new MyDuplex()
// my.on('data', function (data) {
//     console.log(data)
// })
// my.write('hello')

// 转化流 用的比较多的地方 => 压缩
class MyTransfrom extends Transform {
    // 参数和可写流是一样的
    _transform (chunk, encoding, clearBuffer) {
        let str = chunk.toString().toUpperCase()
        this.push(str)
        clearBuffer()
    }
}
let my = new MyTransfrom()
// 会监听可读流中的内容，把内容写入到可写流中
process.stdin.pipe(my).pipe(process.stdout)