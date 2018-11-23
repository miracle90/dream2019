// 发布订阅模式
// 先把需要订阅的内容保存到队列里，当发布时让数组中的函数依次执行
let fs = require('fs')
let student = {}
let Dep = {
    arr: [],
    on(fn) {
        this.arr.push(fn)
    },
    emit() {
        if (Object.keys(student).length === 2) {
            this.arr.forEach(item => {
                item()
            })
        }
    }
}
// 观察者模式、发布订阅 vue观察者模式
Dep.on(function() {
    console.log(student)
})
Dep.on(function() {
    console.log('代码执行结束了')
})
fs.readFile('./async/name.txt', 'utf8', function (err, data) {
    student.name = data
    Dep.emit()
})
fs.readFile('./async/age.txt', 'utf8', function (err, data) {
    student.age = data
    Dep.emit()
})