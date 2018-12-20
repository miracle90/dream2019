// 实现链式调用

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

// 核心方法，处理成功或者失败执行的返回值和 promise2 的关系
function resolvePromise(promise2, x, resolve, reject) {
    // 这个处理函数需要处理的逻辑很复杂
    // 有可能这个 x 是一个 promise，但是这个 promise 并不是我自己的
}

// 公用方法，写在原型上
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    let promise2;       // 这个 promise2 就是我们每次调用 then 后返回的新的 promise

    // 实现链式调用主要靠的就是这个 promise
    promise2 = new Promise(function (resolve, reject) {
        // 没有 new 完，promise2是不存在的
        console.log('resolvePromise ', promise2)
        if (self.status === 'fulfilled') {
            // 这个返回值是成功函数的执行结果
            setTimeout(() => {
                // 没有 new 完，promise2是不存在的
                console.log(promise2)
                // 使用 setTimeout 模拟异步，实际 Promise 采用的是微任务
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0);
        }
        if (self.status === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0);
        }
        if (self.status === 'pending') {
            // 默认当前 new Promise executor 中有异步操作
            // 调用 then 的时候，如果状态为 pending，将函数先存起来
            self.tempFulfilledList.push(function () {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            })
            self.tempRejectedList.push(function () {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            })
        }
    })
    return promise2
}

module.exports = Promise