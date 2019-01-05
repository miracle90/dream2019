let EventEmitter = require('events')
let fs = require('fs')

class WriteStream extends EventEmitter {
    constructor(path, options = {}) {
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
        // 1、需要一个写入的偏移量，可变的
        this.pos = this.start
        // 2、需要绩算当前写入字节数
        this.len = 0
        // 3、是否触发 drain 事件，当前写入的个数和 highWaterMark 比较，默认不触发
        this.needDrain = false
        // 4、缓存队列
        this.cache = []
        // 5、是否正在写入
        this.writing = false
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
    // write 可以是 buffer 和字符串
    write (chunk, encoding = this.encoding, cb = () => {}) {
        // 把所有的类型都转成 Buffer，方便统一长度
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        // 当前这个内容肯定没有写到文件里
        this.len += chunk.length
        this.needDrain = this.len >= this.highWaterMark
        // 正在写入
        if (this.writing) {
            this.cache.push({
                chunk,
                encoding,
                cb
            })
        } else {
            // 更改成正在写入
            this.writing = true
            // 创造一个独立写的方法
            this._write(chunk, encoding, () => {
                cb()
                this.clearBuffer()
            })
        }
        // 返回的是是否达到预期后，触发 drain 事件
        return !this.needDrain
    }
    // 真正的写入逻辑
    _write (chunk, encoding, clearBuffer) {
        // 如果文件还没有打开
        if (typeof this.fd !== 'number') return this.once('open', () => this._write(chunk, encoding, clearBuffer))
        // this.fd 产生了
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, written) => {
            // 第一次已经写入了
            // 写入成功后，缓存区要减小
            this.len -= written
            // 写入的偏移量
            this.pos += written
            // 再去数组里去取，取到后继续写入
            clearBuffer()
        })
    }
    // 当前写入后调用的回调函数
    clearBuffer () {
        let obj = this.cache.shift()
        // 如果取出东西
        if (obj) {
            this._write(obj.chunk, obj.encoding, () => {
                obj.cb()
                this.clearBuffer()
            })
        } else {
            // 缓存区空了
            // 表示彻底都写完了
            this.writing = false
            // 需要触发 drain 事件
            if (this.needDrain) {
                this.needDrain = false
                this.emit('drain')
            }
        }
    }
}

module.exports = WriteStream