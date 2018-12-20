let Promise = require('./promise3')

let fs = require('fs')

function read(url) {
    // q angularjs 1.0 实现
    // 语法糖
    let defer = Promise.defer()
    fs.readFile('./1.promise/' + url, 'utf8', function (err, data) {
        if (err) defer.reject(err)
        defer.resolve(data)
    })
    return defer.promise
    // return new Promise(function (resolve, reject) {
    //     fs.readFile('./1.promise/' + url, 'utf8', function (err, data) {
    //         if (err) reject(err)
    //         resolve(data)
    //     })
    // })
}

read('name.txt').then(function (data) {
    console.log(data)
})