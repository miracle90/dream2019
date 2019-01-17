require('./index.css')

let str = require('./a')

console.log(str)

@log
class A {
    // es7 语法
    a = 1
}

function log(target) {
    console.log(target)
}