let fs = require('fs')
let path = require('path')

// 先序 深度 并行
function removeDir(p, cb) {
    // 判断类型
    fs.stat(p, function (err, statObj) {
        if (statObj.isDirectory()) {
            fs.readdir(p, function (err, dirs) {
                // 把目录映射成相对路径
                dirs = dirs.map(dir => path.join(p, dir))
                // 同时删除这些目录，并行
                // promiseAll
                if (dirs.length === 0) return fs.rmdir(p, cb)
                // 先预定一个函数，所有儿子都删除的函数回调
                // 计数器
                let index = 0
                function all() {
                    if (index === dirs.length) {
                        fs.rmdir(p, cb)
                    }
                }
                dirs.forEach(dir => {
                    index++
                    removeDir(dir, all)
                })
            })
        } else {
            // 如果是文件，直接删除
            fs.unlink(p, cb)
        }
    })
}
removeDir(path.resolve(__dirname, 'a'), function () {
    console.log('先序深度并行删除')
})