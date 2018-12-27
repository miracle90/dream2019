let fs = require('fs')
let path = require('path')

// fs.mkdirSync/fs.mkdir 同步/异步
// fs.mkdirSync('./9.fs/a/b')     // mkdir 会帮你转义
// 目录的创建，只能一层层创建
// 查看目录是否存在 fs.exists 废弃了，fs.accessSync()，是否能被访问，如果不能找到，抛错

// 同步
// function mkdirp(url) {
//     let arr = url.split('/')
//     // for 循环是同步的
//     for (let i = 0; i < arr.length; i++) {
//         let currentDir = url.slice(0, 2 * i + 1)
//         try {
//             fs.accessSync(path.resolve(__dirname, currentDir))
//         } catch (error) {
//             fs.mkdirSync(path.resolve(__dirname, currentDir))
//         }
//     }
// }
// mkdirp('b/e/q')

// 异步
function mkdirp(url, cb) {
    let arr = url.split('/')
    let i = 0
    // 如果像实现异步的迭代，必须要用一个 next 函数
    function next() {
        let currentDir = url.slice(0, 2 * i++ + 1)
        if (i <= arr.length) {
            fs.access(path.resolve(__dirname, currentDir), function (err) {
                if (err) {
                    fs.mkdir(path.resolve(__dirname, currentDir), function () {
                        console.log(i)
                        next()
                    })
                } else {
                    next()
                }
            })
        } else {
            return cb()
        }
    }
    next()
}
mkdirp('b/e/q/m/n/x/y/z', function () {
    console.log('创建成功')
})