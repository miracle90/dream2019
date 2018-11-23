function Promise(executor) {
    let self = this
    // 保存成功的值和失败的原因
    self.value = undefined
    self.reason = undefined
    // 专门存成功的回调
    self.onResolvedCallbacks = []
    // 专门存失败的回调
    self.onRejectedCallbacks = []
    // 保存当前这个 promise 的状态 (promise 有三个状态)
    self.status = 'pending'

    function resolve(value) {
        // 只有 pending 状态才可以改变状态
        if (self.status === 'pending') {
            self.value = value
            self.status = 'resolved'
            if (self.onResolvedCallbacks.length) {
                self.onResolvedCallbacks.forEach(item => {
                    item()
                })
            }
        }
        
    }
    
    function reject(reason) {
        // 只有 pending 状态才可以改变状态
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected'
            if (self.onRejectedCallbacks.length) {
                self.onRejectedCallbacks.forEach(item => {
                    item()
                })
            }
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
    // executor 中有异步操作，此时调用 then 时，处于等待态
    if (self.status === 'pending') {
        self.onResolvedCallbacks.push(function () {
             onFulfilled(self.value)
        })
        self.onRejectedCallbacks.push(function () {
            onRejected(self.reason)
        })
    }
}

module.exports = Promise