// 解决链式调用的问题
// let p = new Promise(function (resolve, reject) {
//     // resolve('有钱了')
//     setTimeout(() => {
//         reject('没钱')
//     }, 1000);
// })

// p.then(function (res) {
//     console.log(res)
// }, function (err) {
//     console.log(err)
// })

let fs = require('fs')

// 封装
function read(url) {
    return new Promise(function (resolve, reject) {
        fs.readFile('./1.promise/' + url, 'utf8', function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}

// 链式调用
// promise 每次调用后，返回一个新的 promise（jQuery 采用返回 this）
// read('name.txt').then(function (res) {
//     // then方法成功后，返回的是一个新的 promise，这个返回的 promise 会被执行
//     // 如果返回的 promise 是成功的，会把这个结果传递给下一个 then 中
//     return read(res)
// }, function (err) {
//     console.log(err)
// }).then(function (res) {
//     console.log('res ', res)
// }, function (err) {
//     console.log('err ', err)
// })

read('name.txt').then(function (res) {
    // 如果返回的是 promise，用 promise 的成功或者失败执行下一个 then
    // 如果返回的是一个普通值，传递给下一个 then 的成功
    // return res
    // 如果抛出异常，传递给下一个 then 的失败
    // catch 统一捕获错误
    // then 中可以不传递参数，如果不传递，会传递到下一个 then 中
    throw new Error()
}, function (err) {
    console.log('1err ', err)
}).then().then(function (res) {
    console.log('res ', res)
}, function (err) {
    console.log('2err ', err)
}).catch(function (err) {
    // catch 的返回结果是 undefined，走下一个 then 的成功
    // return undefined
    console.log('catch', err)
}).then(function (res) {
    console.log('catch result ', res)
})

// Promise 提供了一个并发的方法 Promise.all
// all 方法放回的结果也是一个 promise
// all 中都成功才会走 then 中的成功，否则走失败
Promise.all([read('name.txt'), read('age.txt')]).then(function (res) {
    console.log(res)
}).catch(function (err) {
    console.log('err ', err)
})

// 谁跑得快就以谁的结果为准
Promise.race([read('name.txt'), read('age.txt'), 1]).then(function (res) {
    console.log(res)
}).catch(function (err) {
    console.log('err ', err)
})

// 面试题：
new Promise(function (resolve, reject) {
    // resolve(1)
    reject('reject')
}).then(function (res) {
    console.log(res)
    return 2
}).catch(function (err) {
    console.log(err)
    return 3
}).then(function (res) {
  console.log(res)  
})

// resolve
// 1
// 2

// reject
// 'reject'
// 3

Promise.resolve(1).then(function (x) {
    return x + 1
}).then(function (x) {
    throw new Error(x)
}).catch(function () {
    return 1
}).then(function (x) {
    return x + 1
}).then(function (x) {
    console.log(x)
    // throw new Error()
}).catch(function (err) {
    console.log('catch ', err)
})

// 2