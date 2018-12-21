// 箭头函数 语法糖

// 1、this
// 2、arguments

// 箭头函数不需要 function 关键字
// 可以不写 return，也要去掉 {}
// 如果参数只有一个，可以不写 ()
// 如果返回的是一个对象，需要用 () 包起来
// 参数和方法体用 => 连接

// function fn(a, b) {
//     return a + b
// }

// let fn = (a, b) => {
//     return a + b
// }
// // let fn = (a, b) => a + b
// // let fn = el => el
// console.log(fn)

// // 高阶函数
// function a(x) {
//     return function (y) {
//         return x + y
//     }
// }
// a(x)(y)
// let a = x => y => x + y
// let a = x => y => ({sum: x + y})

// 没有 arguments，使用剩余运算符
let sum = (...args) => {
    console.log(args)
}

sum(1,2,3,4,5)

// 没有 this
// this 和在哪里声明没关系，看在哪里调用