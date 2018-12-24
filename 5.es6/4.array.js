// find
// findIndex
// forEach
// map
// reduce
// some
// every

// reduce 收敛 reduce / reduceRight
// 把结果聚合起来
let r = [1,2,3,4,5].reduce((prev, next, currentIndex, arr) => {
    console.log(prev, next, currentIndex, arr)
    return prev + next
}, 0)
console.log(r)

let r1 = [{price: 1, count: 2}, {price: 3, count: 4}, {price: 5, count: 6}].reduce((prev, next, currentIndex, arr) => {
    console.log(prev, next, currentIndex, arr)
    return prev + next.price * next.count
}, 0)
console.log(r1)

// compose 组合
function sum(a, b) {
    return a + b
}
function toUpper(str) {
    return str.toUpperCase()
}
function add(str) {
    return `哈哈哈 ${str}`
}
function add1(str) {
    return `啦啦啦 ${str}`
}
// let compose = (...fns) => (...args) => {
//     let fn = fns.pop()
//     let r = fn(...args)
//     return fns.reduceRight((prev, next) => next(prev), r)
// }
let compose = (...fns) => {
    // 正向的 reduce 最终收敛的结果，需要是一个函数
    return fns.reduce((prev, next) => (...args) => prev(next(...args)))
}
let composeFn = compose(add1, add, toUpper, sum)
let result = composeFn('y', 'y')
console.log(result)
// console.log(add(toUpper(sum('y', 'y'))))

// reduce 源码
Array.prototype.reduce = function (cb, prev) {
    for (let i = 0; i < this.length; i++) {
        if (prev != null) {
            prev = cb(prev, this[i], i, this)
        } else {
            prev = cb(this[i], this[i + 1], i, this)
            i++
        }
    }
    return prev
}
let r = [1, 2, 3].reduce((next, prev) => next + prev, 0)
console.log(r)


// map 映射
// let r = [1, 2, 3].map(item => item + 3)
// 模板字符串可以换行
let r = [1, 2, 3].map(item => `<li>
    "${item + 3}"
</li>`)
console.log(r)


// 自己实现一个模板字符串
let name = 'lyy'
let age = 18
let str = "${name}今年${age}岁了"
let r = str.replace(/\$\{([^}]*)\}/g, function () {
    // eval 把字符串当前变量执行
    return eval(arguments[1])
})
console.log(r)