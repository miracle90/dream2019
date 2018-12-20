// 如果当前 new Promise executor 中有异步操作

// 1、Promise 需要有三个状态 panding fulfilled rejected
function Promise(executor) {
    let self = this
    self.status = 'pending'
    self.value = undefined
    self.reason = undefined
    // 存放状态的数组
    self.tempFulfilledList = []
    self.tempRejectedList = []

    // 只有状态是 pending，才能进行状态的转化
    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value
            self.status = 'fulfilled'
            self.tempFulfilledList.forEach(item => item())
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected'
            self.tempRejectedList.forEach(item => item())
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
    if (self.status === 'pending') {
        // 默认当前 new Promise executor 中有异步操作
        // 调用 then 的时候，如果状态为 pending，将函数先存起来
        self.tempFulfilledList.push(function () {
            onFulfilled(self.value)
        })
        self.tempRejectedList.push(function () {
            onRejected(self.reason)
        })
    }
}

module.exports = Promise