// let { promisify } = require('util')
let util = require('util')
let path = require('path')      // 专门处理路径 join resolve extname

// mz 实现 promise 化，且 promise all 不用改变方法名 readFileAsync
// let fs = require('fs')
let fs = require('mz/fs')
// let read = promisify(fs.readFile)

// 写成 async await，少很多嵌套
async function r(file) {
    let data = await fs.readFile(path.resolve(__dirname, file), 'utf8')
    console.log(data)
}

new Promise(function (resolve, reject) {
    console.log('promise')
    resolve()
}).then(function () {
    console.log('then')
})

r('note.md')

// util.inherits 继承
// Object.setPrototypeOf => xxx.prototype.__proto__ = xxx.prototype
// Child.__proto__ = Parent 继承静态属性

function Parent() {
    
}
function Child() {
    
}
util.inherits(Child, Parent)

// node 中的发布订阅 vue eventBus