// let Promise = require('./7.promiseSource')

let p = new Promise(function (resolve, reject) {
    // throw new Error('失败')
    resolve()
})

p.then(function (value) {
    console.log('val', value)
    return Promise.resolve(1000)
}, function (reason) {
    console.log('rea', reason)
}).then(function (data) {
    console.log(data)
})

// then 执行后应该返回一个新的 promise
// 因为 promise 的状态一旦失败就不能再成功了
// Promise.reject().then(null, err => {
//     return 100
// }).then(data => {
//     console.log('resolve', data)
// }, err => {
//     console.log(err)
// })