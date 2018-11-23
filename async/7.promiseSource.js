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
    try {
        // executor 是立即执行
        executor(resolve, reject)
    } catch (e) {
        // 如果执行执行器时发生异常，那就走到 then 失败的函数中
        console.log(e)
        reject(e)
    }
  
}

// 解析链式调用（他还要和其他的 promise 进行结合）
function resolvePromise(x, promise, resolve, reject) {

}

// then 方法中需要传递两个参数，分别是成功的回调和失败的回调
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    // 调用 then 后返回一个 promise
    let promise2 = new Promise(function (resolve, reject) {
        if (self.status === 'resolved') {
            // 我们现在需要做的事情就是把 then 中成功或者失败后函数执行的结果获取到
            // 判断是否为 promise，如果是 promise，就让 promise 执行，取到最终这个 promise 的执行结果，让返回的 promise 成功或者失败
            // 如果 x 为普通值，就让这个返回的 promise 变成成功态
            let x = onFulfilled(self.value)
            resolvePromise(x, promise2, resolve, reject)
        }
        if (self.status === 'rejected') {
            let x = onRejected(self.reason)
            resolvePromise(x, promise2, resolve, reject)
        }
        // executor 中有异步操作，此时调用 then 时，处于等待态
        if (self.status === 'pending') {
            self.onResolvedCallbacks.push(function () {
                let x = onFulfilled(self.value)
                resolvePromise(x, promise2, resolve, reject)
            })
            self.onRejectedCallbacks.push(function () {
                let x = onRejected(self.reason)
                resolvePromise(x, promise2, resolve, reject)
            })
        }
    })
    return promise2
}

module.exports = Promise