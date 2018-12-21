let fs = require('fs')
let bluebird = require('bluebird')

// function read(url) {
//     return new Promise(function (resolve, reject) {
//         // error-first
//         fs.readFile('./1.promise/' + url, 'utf8', function (err, data) {
//             if (err) reject(err)
//             resolve(data)
//         })
//     })
// }

// 将 fs.readFile 进行 promise 化，通用化
function promisify(fn) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            console.log(...args)
            fn(...args, function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}

function promisifyAll(obj) {
    for (let key in obj) {
        let fn = obj[key]
        if (typeof fn === 'function') {
            // 给原来的对象上所有的方法都 promise 化一下
            obj[key + 'Async'] = promisify(fn)
        }
    }
}

// let read = bluebird.promisify(fs.readFile)
// let read = promisify(fs.readFile)

// 将一个对象中的所有方法全都 promise 化
// bluebird.promisifyAll(fs)
promisifyAll(fs)

fs.readFileAsync('./2.promise/package.json', 'utf8').then(function (data) {
    console.log(data)
})