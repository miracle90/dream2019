// generator 生成器 es6 提供的 生成的是迭代器

// 拓展运算符
// let arr = [1,2,3]
// arr = [...arr, 4]
// console.log(arr)

// function sum() {
//     console.log(arguments)
//     console.log(Array.prototype.slice.call(arguments, 0))
//     console.log(Array.prototype.slice.call(arguments, 0).join(''))
//     console.log(Array.from(arguments))
//     console.log([...arguments])
// }
// sum(1,2,3,4)

// 默认 obj 不可迭代
// let obj = {0: 1, 1: 2, 2: 3, length: 3}
// var newObj = [...obj]
// console.log(newObj)

// 什么叫迭代器
// 迭代器就是一个对象
// 每个对象上都有一个 next 方法
// 这个方法调用后会有两个结果 value, done

// 迭代函数
// let o = {0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function () {
//     let currentIndex = 0
//     let that = this
//     return {
//         next () {
//             return {
//                 value: that[currentIndex++],
//                 done: currentIndex === that.length + 1
//             }
//         }
//     }
// }}
// let o = {
//     0: 1,
//     1: 2,
//     2: 3,
//     length: 3,
//     [Symbol.iterator]: function * () {
//         let index = 0
//         while (index !== this.length) {
//             yield this[index++]
//         }
//     }
// }
// let arr = [...o]
// console.log(arr)        

// 生成器可以实现生成迭代器
// 生成器函数就是再函数关键字中加个 *，配合 yield 来使用
// yield 是有暂停功能的

// function * say() {
//     yield 'node'
//     yield 'react'
//     yield 'vue'
//     // 碰到 return，done 变为 true
//     return undefined
// }

// let it = say()
// let { value, done } = it.next()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

// 如何遍历迭代器，遍历到 done 为 true
// let flag = false
// do {
//     let { value, done} = it.next()
//     console.log(value)
//     flag = done
// } while (!flag)

// yield 的返回值问题,蛇形走位
function * say () {
    let a = yield 'hello'
    console.log('a ', a)
    let b = yield 'world'
    console.log('b ', b)
    let c = yield 'lyy'
    console.log('c ', c)
    return undefined
}

let it = say()
// 第一次 next 传递参数是没有意义的
console.log(it.next(100))
console.log(it.next(200))
console.log(it.next(300))
console.log(it.next(400))
// it.next(100)
// it.next(200)
// it.next(300)
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())


let fs = require('fs')

// Promise实现
function read(url) {
    return new Promise(function (resolve, reject) {
        fs.readFile('./1.promise/' + url, 'utf8', function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}
// read('1.txt').then(function (data) {
//     return read(data)
// }).then(function (data) {
//     return read(data)
// }).then(function (data) {
//     console.log(data)
// }).catch(function (err) {
//     console.log(err)
// })

// Generator实现
function * r (url) {
    let r1 = yield read(url)
    let r2 = yield read(r1)
    let r3 = yield read(r2)
    return r3
    // console.log(r3)
}

// let i = r('1.txt')
// let { value, done } = i.next()
// value.then(function (data) {
//     value = i.next(data).value
//     value.then(function (data) {
//         value = i.next(data).value
//         value.then(function (data) {
//             console.log(data)
//             i.next(data)
//         })
//     })
// })

function co(it) {
    return new Promise(function (resolve, reject) {
        // 使用迭代函数 来实现异步操作按顺序执行
        // next 方法，express koa 原理都是这样
        function next(data) {
            let { value, done } = it.next(data)
            if (done)  {
                resolve(value)
            } else {
                value.then(function (data) {
                    next(data)
                }, reject)
            }  
        }
        next()
    })
}

// 使用 co 库
// let co = require('co')
co(r('1.txt')).then(function (data) {
    console.log(data)
})