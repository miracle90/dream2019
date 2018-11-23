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
// 5. promise 中有三个状态 pendding resolved rejected，pendding -> resolved 或者 pendding -> rejected
//    resolved 不能和 rejected 相互转换

let fs = require('fs')
let student = {}
fs.readFile('./async/name.txt', 'utf8', function(err, data) {
    student.name = data
    fs.readFile('./async/age.txt', 'utf8', function (err, data) {
        student.age = data
        console.log(student)
    })
})

