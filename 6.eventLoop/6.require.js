// let a = require('./a')
// console.log(a)

// 流程
// require 方法
// Module._load 加载模块
// Module._resolveFilename 解析文件名 把一个相对路径转化成绝对路径 加一个.js后缀
// Module._cache 存放缓存的
// new Module(filename, parent)     如果没有缓存，就创建一个模块
// Module 中 1：路径 2：exports = {}
// 把模块缓存起来 绝对路径
//  tryModuleLoad(module, filename)     尝试加载模块 load()
// 如果是 json 按照 json 来处理，如果是 js 按照 js 来处理
// module.extensions[];

let path = require('path')
let fs = require('fs')
let vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}
}
Module.wrap = function (script) {
    return `(function (exports, require, module, __filename, __dirname) {
        ${script}
    });`
}
Module._extensions = {
    '.js'(module) {
        let content = fs.readFileSync(module.id, 'utf8')
        let fnStr = Module.wrap(content)
        let fn = vm.runInThisContext(fnStr)
        fn.call(module.exports, module.exports, req, module)
    },
    '.json'(module) {
        let content = fs.readFileSync(module.id, 'utf8')
        module.exports = JSON.parse(content)
    }
}

function req(p) {
    // 把相对路径转化成绝对路径
    let realPath = path.resolve(__dirname, p)
    let module = new Module(realPath)
    let extName = path.extname(module.id)
    Module._extensions[extName](module)
    return module.exports
}

let r = req('./a.js')
console.log(r)

// 断点调试，看看逻辑，简化逻辑，实现缓存功能，实现模块的自动后缀查找（先找js再找json再找node）

// fs.accessSync()
