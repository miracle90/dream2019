let fs = require('fs')
let path = require('path')

// 同步广度
function wideSync(p) {
    let arr = [p]
    let index = 0
    let current
    while (current = arr[index]) {
        let statObj = fs.statSync(current)
        if (statObj.isDirectory()) {
            let dirs = fs.readdirSync(current)
            dirs = dirs.map(dir => path.join(current, dir))
            arr = [...arr, ...dirs]
            index++
        } else {
            // 如果是文件，删除，并且从数组中删除
            fs.unlinkSync(current)
            arr.splice(index, 1)
        }
    }
    for (let i = arr.length - 1; i > -1; i--){
        fs.rmdirSync(arr[i])
    }
}
wideSync(path.resolve(__dirname, 'b'))