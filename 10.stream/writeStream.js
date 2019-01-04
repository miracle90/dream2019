let EventEmitter = require('events')

class WriteStream extends EventEmitter {
    constructor(path, options = {

    }) {
        super()
        this.path = path
        this.flags = options.flags || 'w'
        this.encoding = options.encoding || 'utf8'
        this.mode = options.mode || 0o666
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.highWaterMark = options.highWaterMark || 16 * 1024

        // 打开文件
        this.open()
        // 1、需要一个写入的偏移量
        // 2、
        this.pos = this.start
    }
    // open 异步的
    open () {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) return this.emit('error', err)
            this.fd = fd
            this.emit('open', fd)
        })
    }
    // 这个 write 方法一上来就执行了，等着 open 后再调用
    write (chunk, encoding, cb) {

    }
}

module.exports = WriteStream