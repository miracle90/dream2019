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
// 递归检查 promise
function resolvePromise(promise2, x, resolve, reject) {
    // 这个处理函数需要处理的逻辑很复杂
    // 有可能这个 x 是一个 promise，但是这个 promise 并不是我自己的
    if (promise2 === x) {
        throw new TypeError('Chaining cycle detected for promise #<Promise>')
    }

    // 文档要求，一旦成功，不能失败
    let called
    // 不单单要考虑自己，还要考虑有可能是别人的 Promise
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        // 这样 x 可能是一个 promise，必须包含 then 方法
        try {
            // 取 then 方法
            let then = x.then
            if (typeof then === 'function') {
                // 如果是个函数
                then.call(x, function (y) {
                    if (!called) {
                        called = true
                    } else {
                        return
                    }
                    resolvePromise(promise2, y, resolve, reject)
                }, function (r) {
                     if (!called) {
                         called = true
                     } else {
                         return
                     }
                    reject(r)
                })
            } else {
                // then方法不存在
                // 普通值
                resolve(x)
            }
        } catch (e) {
            // 如果取 then 方法出错了，就走失败
            if (!called) {
                called = true
            } else {
                return
            }
            reject(e)
        }
    } else {
        resolve(x)
    }
}

// 公用方法，写在原型上
Promise.prototype.then = function (onFulfilled, onRejected) {
    // 如果没传 onFulfilled 或者 onRejected
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
        throw err
    }

    let self = this
    let promise2; // 这个 promise2 就是我们每次调用 then 后返回的新的 promise

    // 实现链式调用主要靠的就是这个 promise
    promise2 = new Promise(function (resolve, reject) {
        if (self.status === 'fulfilled') {
            // 这个返回值是成功函数的执行结果
            setTimeout(() => {
                // 没有 new 完，promise2是不存在的
                // console.log(promise2)
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
                        console.log(e)
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

// finally 也是 then 的一个简写
Promise.prototype.finally = function (cb) {
    // 无论成功还是失败，都要执行 callback
    // 并且把成功和失败的值向下传
    return this.then(function (data) {
        cb()
        return data
    }, function (err) {
        cb()
        throw err
    })
}

// catch 就是没有成功的 then
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

// 上来就成功 类调用的都叫静态方法
Promise.resolve = function (value) {
    return new Promise(function (resolve, reject) {
        resolve(value)
    })
}

// 上来就失败 类调用的都叫静态方法
Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason)
    })
}

// 检测是否符合 promise/A+规范
// npm install promises-aplus-tests -g
// q库 angularjs 1.0 实现 语法糖
Promise.deferred = Promise.defer = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
        let arr = []
        // 处理数据的方法
        let i = 0

        function processData(index, data) {
            arr[index] = data
            // 还是要使用计数器，数组的索引和长度的关系
            if (++i === promises.length) {
                resolve(arr)
            }
        }
        for (let i = 0; i < promises.length; i++) {
            let promise = promises[i]
            // 如果有 then 方法表明是一个 promise
            if (typeof promise.then === 'function') {
                promise.then(function (data) {
                    // 把索引和数据对应起来，方便实用
                    processData(i, data)
                }, reject)
            } else {
                processData(i, promise)
            }
        }
    })
}

Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < promises.length; i++) {
            let promise = promises[i]
            if (typeof promise.then === 'function') {
                promise.then(resolve, reject)
            } else {
                resolve(promise)
            }

        }
    })
}

module.exports = Promise