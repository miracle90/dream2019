let fs = require('fs')
let path = require('path')

// 用 webpack 打包之前，删掉之前的目录

// 如果目录下有东西，要先读取目录下的文件，将目录打印出来 fs.readdirSync（只能读取儿子辈的）

// let statObj = fs.statSync()    判断文件是否存在，会返回一个状态对象
// statObj.isFile
// statObj.isDirectory

// fs.rmdirSync(path.resolve(__dirname, 'a/b'))

// 删除的过程就是先删除儿子，再删除自己
let dirList = fs.readdirSync(path.resolve(__dirname, 'a'))
dirList = dirList.map(item => path.resolve(__dirname, 'a', item))
dirList.forEach(dir => {
    let statObj = fs.statSync(dir)
    if (statObj.isFile()) {
        fs.unlinkSync(dir)
    } else {
        fs.rmdirSync(dir)
    }
})
fs.rmdirSync(path.resolve(__dirname, 'a'))

// readdirSync、statSync（isFile）、unlinkSync、rmdirSync

// 先序，中序，后序