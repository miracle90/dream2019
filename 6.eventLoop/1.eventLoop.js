// 1：
// setTimeout(() => {
//     console.log('0')
//     setTimeout(() => {
//         console.log('哈哈')
//     }, 0);
// }, 0);

// setTimeout(() => {
//     console.log('1')
// }, 0);

// 2：
// setTimeout(() => {
//     console.log('setTimeout')
// }, 0);
// Promise.resolve().then(function () {
//     console.log('then')
// })
// console.log('xxx')
// 会把栈中的代码全部执行后，取出队列中的第一个执行，执行完后，再去取第二个

// setTimeout(() => {
//     console.log('setTimeout')
// }, 0);
// Promise.resolve().then(function () {
//     console.log('then1')
// })
// Promise.resolve().then(function () {
//     console.log('then2')
// })

// 浏览器的 eventLoop 会先将所有的微任务执行后，再执行宏任务

Promise.resolve().then(function () {
    console.log('then1')
    setTimeout(() => {
        console.log('timer1')
    }, 0);
})
setTimeout(() => {
    console.log('timer2')
    Promise.resolve().then(function () {
        console.log('then2')
    })
}, 0);

// 浏览器环境
// then1
// timer2
// then2
// timer1

// node 环境
// then1
// timer2
// timer1
// then2

// 宏任务：
// setTimeout
// setImmediate优先级比 setTimeout 低
// MessageChannel 优先级比 setTimeout 高

// 微任务：then、MutationObserver

// vue 中的 nextTick 怎么实现