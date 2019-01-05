// 如果用文件的流，他会采用 fs.read fs.write
// 流的模块
let { Readable, Writable } = require('stream')
let path = require('path')

// let fs = require('fs')
// fs.createReadStream(path.resolve(__dirname, 'a.txt'))

// 我的流如果继承了 Readable 接口，就必须要重写一个 _read 的方法
class MyReadStream extends Readable {
    constructor () {
        super()
        this.index = 0
    }
    _read () {
        // push 方法也是 Readable 实现的
        if (this.index === 5) {
            // 读取完毕
            return this.push(null)
        }
        this.push(this.index++ + '')
    }
}
let rs = new MyReadStream()
rs.on('data', function (data) {
    console.log(data)
})
rs.on('end', function () {
    console.log('end')
})


class MyWriteStream extends Writable {
    constructor() {
        super()
    }
    _write(chunk, encoding, clearBuffer) {
        console.log(chunk.toString())
        clearBuffer()
    }
}
let ws = new MyWriteStream()
ws.write('hello', 'utf8', function () {
    console.log('ok')
})
ws.write('hello', 'utf8', function () {
    console.log('ok')
})
