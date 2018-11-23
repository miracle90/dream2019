function Promise(executor) {
    let self = this
    // 保存成功的值和失败的原因
    self.value = undefined
    self.reason = undefined
    // 保存当前这个 promise 的状态 (promise 有三个状态)
    self.status = 'pending'
    function resolve(value) {
        // 只有 pending 状态才可以改变状态
        if (self.status === 'pending') {
            self.value = value
            self.status = 'resolved'
        }

    }
    function reject(reason) {
        // 只有 pending 状态才可以改变状态
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected'
        }
    }
    // executor 是立即执行
    executor(resolve, reject)
}

// then 方法中需要传递两个参数
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    if (self.status === 'resolved') {
        onFulfilled(self.value)
    }
    if (self.status === 'rejected') {
        onRejected(self.reason)
    }
}

module.exports = Promise