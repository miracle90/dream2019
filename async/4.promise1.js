// 1.毁掉地狱
// 2.多个异步请求在同一时间合并结果

// Promise 自带的，不兼容低版本IE
// Promise使用时，需要 new Promise

let p = new Promise(function (resolve, reject) {
    console.log('1')
    resolve('有钱')
    reject('没钱')
})

p.then(function (value) {       // 成功的函数
    console.log(value)
}, function (reason) {      // 失败的函数
    console.log(reason)    
})

// 1. Promise 承诺就是一个类型
// 2. new Promise 时，需要传递一个 executor 执行器
// 3. executor 中有两个参数，resolve成功，reject代表的是失败
// 4. 每个 promise 的实例上，都有一个 then 方法，then 方法中有两个函数（成功函数、失败函数）
// 5. promise 中有三个状态 pending resolved rejected，pendding -> resolved 或者 pending -> rejected
//    resolved 不能和 rejected 相互转换

let fs = require('fs')
let student = {}
// fs.readFile('./async/name.txt', 'utf8', function(err, data) {
//     student.name = data
//     fs.readFile('./async/age.txt', 'utf8', function (err, data) {
//         student.age = data
//         console.log(student)
//     })
// })
function read(url, encoding) {
    return new Promise(function(resolve, reject) {
        fs.readFile(url, encoding, function(err, data) {
            // promise 的成功或者失败，取决于是怎样定义的
            if (err) reject(err)
            // 一旦失败就不会成功，不用写 return
            resolve(data)
        })
    })
}
// then 方法执行完，会判断返回的结果，如果是 promise，会把这个 promise 执行
// 会取到他的结果
// 每次调用 then 方法后，会返回一个新的 promise，并不是 this
// promise 的链式调用，解决了回调嵌套的问题
read('./async/name.txt', 'utf8').then(function (data) {
    student.name = data
    return read('./async/age1.txt', 'utf8')
}).then(function(data) {
    student.age = data
    return read('./async/address.txt', 'utf8')
}).then(function (data) {
    student.address = data
    console.log(student)
}).then().then().catch(function (err) {     // 值的穿透
    console.log('catch err', err)
    // return undefined
    // then 中返回 promise，会把 promise 的结果作为下一个 then 的参数
    // then 中返回的是一个普通的值，会把这个普通值，作为下一个 then 的成功的结果
}).then(function (data) {
    console.log('undefined')
    // 1、返回 promise 失败
    return Promise.reject(data)
    // return new Promise(function (resolve, reject) {
    //     reject('失败了')
    // })
}, function (err) {
    console.log('undefined err')
}).then(null, function (err) {
    console.log('reject')
    throw new Error('错误了')
    // 2、如果 then 方法执行抛出了异常，会走下一次 then 的失败的回调
}).then(null, function (err) {
    console.log(err)
})

// 多个异步并发执行，需要在同一时刻内获取最终的结果
// 原理：计数器
Promise.all([read('./async/name.txt', 'utf8'), read('./async/age.txt', 'utf8'), read('./async/address.txt', 'utf8')]).then(function (data) {
    console.log(data)
})
