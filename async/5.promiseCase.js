let Promise = require('./5.promiseSource')

// console.log(Promise)

let p = new Promise(function (resolve, reject) {
    reject('reject')
    resolve('hello')
})

p.then(function (value) {
    console.log('val', value)
}, function (reason) {
    console.log('rea', reason)
})