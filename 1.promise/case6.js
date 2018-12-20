// Promise.all 是并发的，并且结果是有顺序的

// let Promise = require('./promise3')

let fs = require('fs')

function read(url) {
    return new Promise(function (resolve, reject) {
        fs.readFile('./1.promise/' + url, 'utf8', function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}

Promise.all([read('name.txt'), read('age.txt'), 2]).then(function (data) {
    console.log(data)
}, function (err) {
    console.log(err)
})

Promise.race([read('name.txt'), read('age.txt'), 3]).then(function (data) {
    console.log(data)
}, function (err) {
    console.log(err)
})