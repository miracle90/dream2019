let Promise = require('./promise1')

// 同一个 Promise 可以 then 多次
let p = new Promise(function (resolve, reject) {
    // reject('穷')
    // resolve('有钱')
    // 如果使用定时器
    setTimeout(() => {
        reject('穷')
    }, 1000);
})

p.then(function (data) {
    console.log('success1 ', data)
}, function (err) {
    console.log('err1 ', err)
})

p.then(function (data) {
    console.log('success2 ', data)
}, function (err) {
    console.log('err2 ', err)
})