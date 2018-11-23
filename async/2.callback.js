let fs = require('fs')
let obj = {}

// 回调地狱，会导致代码难以维护，而且不方便处理错误
fs.readFile('./async/name.txt', 'utf8', function(err, data) {
    if (err) return
    obj.name = data
    fs.readFile('./async/age.txt', 'utf8', function(err, data) {
        if (err) return
        obj.age = data
        fs.readFile('./async/address.txt', 'utf8', function (err, data) {
            if (err) return
            obj.address = data
            console.log(obj)
        })
    })
})

// 多个异步同时执行，在某一个时刻拿到最终的结果
let student = {}
// 哨兵函数
// function out() {
//     if (Object.keys(student).length === 2)
//     console.log(student)
// }
function after(times, cb) {
    return function () {
        if (--times === 0) {
            cb(student)
        }
    }
}
let out = after(2, function(data) {
    console.log(data)
})
fs.readFile('./async/name.txt', 'utf8', function (err, data) {
    student.name = data
    out()
})
fs.readFile('./async/age.txt', 'utf8', function (err, data) {
    student.age = data
    out()
})

// 发布订阅模式