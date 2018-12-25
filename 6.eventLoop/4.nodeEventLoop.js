// Promise.resolve().then(function () {
//     console.log('promise1')
//     setTimeout(() => {
//         console.log('timer1')
//     }, 0);
// })
//  setTimeout(() => {
//     console.log('timer2')
//     Promise.resolve().then(function () {
//         console.log('promise2')
//     })
// }, 0);
// 两种可能，如果 timer1 到时间了，执行 timer1，没到时间，执行 promise2
// promise1 timer2 timer1 promise2
// promise1 timer2 promise2 timer1

// setTimeout(() => {
//     console.log('timeout')
// }, 0);
// setImmediate(() => {
//     console.log('setImmediate')
// })
// 执行顺序同样不确定
// 如果主执行栈执行非常快，定时器还没到时间，执行 setImmediate
// 如果主执行栈执行较慢，定时器已经到时间，执行 setTimeout

let fs = require('fs')
fs.readFile('.gitignore', 'utf8', function (data) {
    setTimeout(() => {
        console.log('timeout')
    }, 0);
    setImmediate(() => {
        console.log('setImmediate')
    })
})
// i/o 操作后面走 setImmediate，所以 setImmediate 在前