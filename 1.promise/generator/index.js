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
let o = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function * () {
        let index = 0
        while (index !== this.length) {
            yield this[index++]
        }
    }
}
let arr = [...o]
console.log(arr)        // 生成器可以实现生成迭代器，生成器函数就是再函数关键字中加个 *，配合 yield 来使用

// yield 是有暂停功能的
