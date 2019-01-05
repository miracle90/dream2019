// 可读流是一个类
let fs = require('fs')
let EventEmitter = require('events')

class ReadStream extends EventEmitter{
    constructor(path, options = {
        // promise 所有的属性都需要挂载在实例上，方便使用
    }) {
        super()
        this.path = path
        this.flags = options.flags || 'r'
        this.encoding = options.encoding || null
        this.mode = options.mode || 0o666
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.end = options.end || null
        this.highWaterMark = options.highWaterMark || 64 * 1024

        // 当前模式，是不是流动模式，默认非流动模式
        this.flowing = false
        this.open()

        this.on('newListener', (type) => {
            // 如果类型不是data，不做处理，如果是data，开始读取文件
            if (type === 'data') {
                this.flowing = true
                this.read()
            }
        })
        // start是不变的，position是可以变的
        this.position = this.start || 0
    }
    open () {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) return this.emit('error', err)
            // 保存在当前实例上
            this.fd = fd
            this.emit('open', fd)
        })
    }
    // 用户监听了data事件，开始读取
    // 打开文件，read方法来读取
    read () {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this.read())
        }
        // 到此说明 fd 存在，创建一个buffer，把文件中的内容读取到buffer中
        let buffer = Buffer.alloc(this.highWaterMark)
        // 先计算一个靠谱的值来读取
        // 怎么算应该读取多少个 一个要读取0-5,6个，每次读4个
        let howMutchToRead = this.end ? Math.min(this.highWaterMark, this.end - this.position + 1) : this.highWaterMark
        fs.read(this.fd, buffer, 0, howMutchToRead, this.position, (err, bytesRead) => {
            // 能读取到东西
            if (bytesRead > 0) {
                this.position += bytesRead
                let chunk = this.encoding ? buffer.slice(0, bytesRead).toString(this.encoding) : buffer.slice(0, bytesRead)
                this.emit('data', chunk)
                // 如果是流动模式，就要不停地读取，一直到读不到为止
                if (this.flowing) {
                    this.read()
                }
            } else {
                this.emit('end')
                this.emit('close')
            }
        })
    }
    pause () {
        this.flowing = false
    }
    resume () {
        this.flowing = true
        this.read()
    }
    pipe(dest) {
        this.on('data', (chunk) => {
            let flag = dest.write(chunk)
            if (!flag) {
                this.pause()
            }
        })
        dest.on('drain', () => {
            this.resume()
        })
    }
}

module.exports = ReadStream