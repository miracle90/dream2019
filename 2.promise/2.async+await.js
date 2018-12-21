let fs = require('fs')
let bluebird = require('bluebird')
let read = bluebird.promisify(fs.readFile)

// 1、回调的缺陷：
// a：回调地狱
// b：同步异步的结果
// c：捕获错误 try/catch

// function * readResult(url) {
//     let r1 = read(url, 'utf8')
//     let r2 = read(r1, 'utf8')
//     return r2
// }

async function readResult(url) {
    let str = './2.promise/'
    try {
        let r1 = await read(str + url, 'utf8')
        let r2 = await read(str + r1, 'utf8')
        return r2
    } catch (e) {
        console.log('e ', e)
    }
}

// async 函数返回的也是一个 promise
readResult('1.txt').then(data => {
    console.log('data ', data)
}).catch(err => {
    console.log('catch ', err)
})

// Promise.all

// function readAll() {
//     read1()
//     read2()
// }
// async function read1() {
//     let r = await read('./2.promise/1.txt', 'utf8')
//     console.log('r1 ', r)
// }
// async function read2() {
//     let r = await read('./2.promise/2.txt', 'utf8')
//     console.log('r2 ', r)
// }
// readAll()

async function fn() {
    let t = Promise.all([read('./2.promise/1.txt', 'utf8'), read('./2.promise/2.txt', 'utf8')])
    console.log(t)
}
fn()

// async await 本质就是 generator + co
async function fn() {
    await 1
    await 2
}