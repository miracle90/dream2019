import { Script } from "vm";

// 今日头条面试题
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1')
    resolve();
}).then(function () {
    console.log('promise2')
})
console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// promise2
// async1 end
// setTimeout

// promise2 async1 end V8新老版本执行结果不一样


setTimeout(() => {
	console.log('timer')
	Promise.resolve().then(function () {
		console.log('promise1')
	})
}, 0);
Promise.resolve().then(function () {
	console.log('promise2')	
	Promise.resolve().then(function () {
		console.log('promise3')
	})
})
console.log('script')
Promise.resolve().then(() => {
	console.log('Promise1')
	setTimeout(() => {
		console.log('setTimeout2')
	}, 0);
})
setTimeout(() => {
	console.log('setTimeout1')
	new Promise(resolve => {
		console.log('promise start')
		resolve()
	}).then(() => {
		console.log('Promise2')
	})
}, 0);
console.log('start')

// Node 环境执行结果
// script
// start
// promise2
// Promise1
// promise3
// timer
// setTimeout1
// promise start
// promise1
// Promise2
// setTimeout2

// 浏览器环境执行结果
// script
// start
// promise2
// Promise1
// promise3
// timer
// promise1
// setTimeout1
// promise start
// Promise2
// setTimeout2