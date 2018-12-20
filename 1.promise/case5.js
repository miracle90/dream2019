let Promise = require('./promise3')

// let p = new Promise(function (resolve, reject) {
//     reject('err')
// })

let p = Promise.resolve('success')
// let p = Promise.reject('err')

// catch 就是没有成功的 then
// p.then(function name(data) {
//     console.log(data)
// }).catch(function (err) {
//     console.log(err)
// })

// finally 最终的 无论成功还是失败都会执行的函数
// 箭头函数没有 arguments
p.finally(function () {
    console.log('finally')
}).then(function (data) {
    console.log('success ', data)
}, function (err) {
    console.log('err ', err)   
})