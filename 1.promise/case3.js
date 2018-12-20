// let Promise = require('./promise3')

let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        reject('有钱')
    }, 0);
})

// 如果 then 方法返回了一个 promise
// 当前返回的 promise2 应该等待 promise执行结果再继续
// let promise2 = p.then(function () {
//     // 如果抛出异常
//     // throw new Error()
//     // 如果返回的是一个普通值
//     // return 100
//     // 如果返回的是一个 promise
//     // return new Promise((resolve, reject) => {
//     //     resolve(1000)
//     // })
//     // resolve 的是一个 promise
//     return new Promise((resolve, reject) => {
//         resolve(new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(10000)
//             }, 1000);
//         }))
//     })
// }).then(function (data) {
//     console.log('data ',data)
// }, function (err) {
//     console.log('err ', err)
// })

// 值的穿透问题
p.then().then().then(function (data) {
    console.log('data ', data)
}, function (err) {
    console.log('err ', err)
})