let fs = require('fs')
let path = require('path')

// 用 webpack 打包之前，删掉之前的目录

// 如果目录下有东西，要先读取目录下的文件，将目录打印出来 fs.readdirSync（只能读取儿子辈的）

// let statObj = fs.statSync()    判断文件是否存在，会返回一个状态对象
// statObj.isFile
// statObj.isDirectory

// fs.rmdirSync(path.resolve(__dirname, 'a/b'))

// 删除的过程就是先删除儿子，再删除自己
// let dirList = fs.readdirSync(path.resolve(__dirname, 'a'))
// dirList = dirList.map(item => path.resolve(__dirname, 'a', item))
// dirList.forEach(dir => {
//     let statObj = fs.statSync(dir)
//     if (statObj.isFile()) {
//         fs.unlinkSync(dir)
//     } else {
//         fs.rmdirSync(dir)
//     }
// })
// fs.rmdirSync(path.resolve(__dirname, 'a'))

// readdirSync、statSync（isFile）、unlinkSync、rmdirSync

// 先序，中序，后序

// 先序 深度 同步
// function removeDirSync(p) {
//     // 判断类型 fs.statSync
//     let statObj = fs.statSync(p)
//     if (statObj.isDirectory()) {
//         // todo...
//         let dirs = fs.readdirSync(p)
//         console.log(dirs)
//         // 拿到子元素，删除子元素
//         dirs.forEach(dir => {
//             // 循环儿子路径，拼接父亲路径，如果是文件夹，就要递归删除
//             let currentPath = path.join(p, dir)
//             console.log(currentPath)
//             removeDirSync(currentPath)
//         })
//         // // 删除自己
//         fs.rmdirSync(p)
//     } else {
//         // 如果是文件，直接删除
//         fs.unlinkSync(p)
//     }
// }
// removeDirSync(path.resolve(__dirname, 'a'))

// 先序 深度 异步 串行
function removeDir(p, cb) {
    // 判断类型
    fs.stat(p, function (err, statObj) {
        if (err) {
            return console.log(err)
        }
        if (statObj.isDirectory) {
            fs.readdir(p, function (err, dirs) {
                // 读取目录，如果没有儿子，就把自己删除
                if (dirs.length === 0) fs.rmdir(p, cb)
                dirs = dirs.map(dir => path.join(p, dir))
                let index = 0
                function next(i) {
                    // 先删除 b 目录，后面放一个回调，当自己删除后，再调用回调继续删除
                    removeDir(dirs[i], () => next(i + 1))
                }
                next(index)
            })
        } else {
            // 如果是文件，直接删除
            fs.unlink(p, cb)
        }
    })
}
removeDir(path.resolve(__dirname, 'a'), function () {
    console.log('先序深度异步串行删除')
})