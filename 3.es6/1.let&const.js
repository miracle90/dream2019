// es6 let 和 const

// var function 关键字 变量提升问题
// 还可以重复声明
// var 会先声明 不会赋值

// console.log(a)
// var a = 1
// var a = 2

// let 不会污染全局变量（产生一个作用域）
// 在以前的代码，存在 全局作用域 函数作用域

// let a = 2
// {
//     console.log(a)      // 暂存死区 a is not defined
//     let a = 1
// }
// console.log(a)

// for (let i = 0; i < 10; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, 0);
// }

// const 和 let 功能是一样，let可以重新赋值，const不能改变赋值空间

const a = []
a.push(1)

console.log(a)
