let fs = require('fs')
let path = require('path')

// 先序 深度 并行 promise版本
function removeDir(p) {
    return  new Promise((resolve, reject) => {
        fs.stat(p, function (err, statObj) {
            if (statObj.isDirectory()) {
                fs.readdir(p, function (err, dirs) {
                    dirs = dirs.map(dir => path.join(p, dir))
                    console.log(dirs)
                    // 把所有路径包装成 promise
                    dirs = dirs.map(dir => removeDir(dir))
                    console.log(dirs)
                    Promise.all(dirs).then(data => {
                        fs.rmdir(p, resolve)
                    })
                })
            } else {
                fs.unlink(p, resolve)
            }
        })
    })
}
removeDir(path.resolve(__dirname, 'a')).then(data => {
    console.log('promise all 删除成功 ', data)
})
