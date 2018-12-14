function EventEmitter() {
    // 用来维护关系
    this._events = {}
}

EventEmitter.prototype.on = function (eventName, cb) {
    // if (this._events[eventName]) {
    //     this._events[eventName].push(cb)
    // } else {
    //     this._events[eventName] = [cb]
    // }
    // 如果当前调用 on 方法时，自己还没有 events 属性，那就再加一个
    if (!this._events) this._events = {}

    if (eventName !== 'newListener') {
        
    }

    let arr = this._events[eventName] || []
    this._events[eventName] = [...arr, cb]
}

EventEmitter.prototype.off = function (eventName, cb) {
    if (this._events[eventName]) {
        // 返回 true 表示留下 删除的话 永远是 !=
        this._events[eventName] = this._events[eventName].filter(fn => fn != cb)
    }
}

EventEmitter.prototype.emit = function (eventName) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => {
            fn()
        });
    }
}

module.exports = EventEmitter