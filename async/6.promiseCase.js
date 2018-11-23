let Promise = require('./6.promiseSource')

// console.log(Promise)

let p = new Promise(function (resolve, reject) {
     // executor 中有异步操作，此时调用 then 时，处于等待态
    setTimeout(() => {
        reject('reject')
        resolve('hello')
    }, 1000);
})

p.then(function (value) {
    console.log('val', value)
}, function (reason) {
    console.log('rea', reason)
})

p.then(function (value) {
    console.log('val', value)
}, function (reason) {
    console.log('rea', reason)
})