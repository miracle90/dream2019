// 为什么需要 promise
// 1、回调地狱
// 2、多个异步实现并发，实现不会同步异步的返回结果
// 3、错误捕获问题

// 什么是 promise 承诺
// promise 有三个状态
// 1、成功态 resolved
// 2、失败态 rejected
// 3、等待态 pending

// 默认情况是 pending，可以变成成功态，也可以变成失败态
// resolved和rejected之间不能相互转化

// 用法
// promise 在 IE 下是不兼容的
// new Promise 的时候，需要传递一个 executor 执行器，执行器函数会默认被内部所执行
let p = new Promise((resolve, reject) => {
    // 如果在这里调用了 resolve，就会变成成功态
    // 同时调用 resolve 和 reject 只会执行一个
    console.log(1)
    resolve()
    reject()
    console.log(2)
})

// 每个 promise 都拥有一个 then 方法
// then 方法是一个异步方法
p.then(function (res) {     // 成功
    console.log(3)
    console.log('resolve ' + res)
}, function (err) {     // 失败
    console.log('err ' + err)
})
