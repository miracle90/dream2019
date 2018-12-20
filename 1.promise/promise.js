// 最基础版本 Promise

// 1、Promise 需要有三个状态 panding fulfilled rejected
function Promise(executor) {
    let self = this
    self.status = 'pending'
    self.value = undefined
    self.reason = undefined

    // 只有状态是 pending，才能进行状态的转化
    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value
            self.status = 'fulfilled'
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected'
        }
    }

    try {
        // 如果这个 execuotr 执行的时候抛出异常
        // 应该走下一个 then 的失败
        executor(resolve, reject)
    } catch (e) {
        // 出错了，调用 reject
        reject(e)
    }
}

// 公用方法，写在原型上
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    if (self.status === 'fulfilled') onFulfilled(self.value)
    if (self.status === 'rejected') onRejected(self.reason)
}

module.exports = Promise