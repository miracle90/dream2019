let Promise = require('./promise2')

// 同一个 Promise 可以 then 多次
let p = new Promise(function (resolve, reject) {
    // reject('穷')
    // resolve('有钱')
    // 如果使用定时器
    // setTimeout(() => {
        // 失败会默认返回 undefined
        resolve('有钱')
    // }, 1000);
})

// promise 中，每次调用 then，都应该返回一个新的 promise，不能返回 this
// 如果返回 this，可能存在一个 promise 实例存在多个状态
p.then(function (data) {
    // console.log('success1 ', data)
    return 100
}, function (err) {
    console.log('err1 ', err)
    // return 1
}).then(function (data) {
    console.log('success2 ', data)
}, function (err) {
    console.log('err2 ', err)
})