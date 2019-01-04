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
        console.log('read ', this.fd)
        let buffer = Buffer.alloc(this.highWaterMark)
        // 先计算一个靠谱的值来读取
        fs.read(fd, buffer, 0, this.highWaterMark, this.position, function (err, bytesRead) {
            // 能读取到东西
            if (bytesRead > 0) {
                this.position += bytesRead
                this.emit('data', buffer)
                if (this.flowing) {
                    this.read()
                }
            }
            
        })
    }
}

module.exports = ReadStream