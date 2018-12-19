// lodash after方法
function after(times, cb) {
    return function () {
        if (--times === 0) {
            cb()
        }
    }
}

let fn = after(3, function () {
    console.log('被执行了3次')
})

fn()
fn()
fn()

// 服务端 node 单线程异步 非阻塞i/o
let fs = require('fs')
let obj = {}
let f = after(2, function () {
    console.log(obj)
})
fs.readFile('./1.promise/name.txt', 'utf8', function (err, data) {
    // 在 vscode 中用 code runner 执行,读取的是根目录下的文件
    // 1、异步代码不能 try catch
    // 2、异步编程中可能存在回调地狱，不方便维护
    // 3、多个异步的操作并发实现
    if (err) return
    obj.name = data
    f()
})

fs.readFile('./1.promise/age.txt', 'utf8', function (err, data) {
    if (err) return
    obj.age = data
    f()
})


// 发布订阅模式实现
let Dep = {
    arr: [],
    // 订阅
    on (fn) {
        this.arr.push(fn)
    },
    // 发布
    emit () {
        // 核心还是计数器
        this.arr.forEach(item => item())
    }
}
Dep.on(function () {
    if (Object.keys(obj).length === 2) {
        console.log(obj)
    }
})
fs.readFile('./1.promise/name.txt', 'utf8', function (err, data) {
    if (err) return
    obj.name = data
    Dep.emit()
})

fs.readFile('./1.promise/age.txt', 'utf8', function (err, data) {
    if (err) return
    obj.age = data
    Dep.emit()
})