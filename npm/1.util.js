let util = require('util')
let path = require('path')      // 专门处理路径 join resolve extname
let fs = require('fs')
let read = promisify(fs.readFile)

async function r() {
    let result = read(path.resolve(__dirname, 'note.md'), 'utf8')
    console.log(result)
}
r()

// util.inherits 继承
// Object.setPrototypeOf   XXX.prototype.__proto__ = XXX.prototype

function Parent(params) {
    
}
function Child(params) {
    
}
util.inherits(Childk, Parent)
