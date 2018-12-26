function EventEmitter() {
    this._events = {}       // 用来维护关系
}

EventEmitter.defaultMaxListeners = 10

EventEmitter.prototype.setMaxListeners = function (num) {
    this.maxListeners = num
}

EventEmitter.prototype.getMaxListeners = function () {
    return this.maxListeners || EventEmitter.defaultMaxListeners
}

EventEmitter.prototype.once = function (event, cb) {
    // 先绑定一个方法，这个方法执行完后，自己再删除掉
    // 绑定 one，one 触发后，把 one 方法移除掉
    // let one = () => {
    //     cb()
    //     this.off(event, one)
    // }
    function one() {
        cb(...arguments)
        this.off(event, one)
    }
    one.l = cb
    this.on(event, one)
}

EventEmitter.prototype.on = function name(event, cb, flag) {
    // 如果当前调用 on 方法时，自己还没有 events，增加一个
    if (!this._events) this._events = {}
    if (event !== 'newListener') {
        if (this._events['newListener']) {
            this._events['newListener'].forEach(fn => fn(event))
        }
    }
    
    let arr = this._events[event] || []
    if (flag) {
        this._events[event] = [cb, ...arr]
    } else {
        this._events[event] = [...arr, cb]
    }
}

EventEmitter.prototype.emit = function name(event, ...args) {
    if (!this._events) this._events = {}
    if (this._events[event]) {
        this._events[event].forEach(fn => {
            fn.call(this, ...args)
        })
    }
}

EventEmitter.prototype.prependListener = function (event, cb) {
    this.on(event, cb, true)
}

EventEmitter.prototype.off = function name(event, cb) {
    if (this._events[event]) {
        this._events[event]  = this._events[event].filter(item => {
            return item !== cb && item.l !== cb
        })
    }
}

module.exports = EventEmitter