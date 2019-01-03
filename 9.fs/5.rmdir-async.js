let fs = require('fs')
let path = require('path')
let { promisify } = require('util')

// promisify
let stat = promisify(fs.stat)
let readdir = promisify(fs.readdir)
let unlink = promisify(fs.unlink)
let rmdir = promisify(fs.rmdir)

// 改造 async + await 版本
async function removeDir(p) {
    let statObj = await stat(p)
    if (statObj.isDirectory()) {
        let dirs = await readdir(p)
        dirs = dirs.map(dir => removeDir(path.join(p, dir)))
        await Promise.all(dirs)
        await rmdir(p)
    } else {
        await unlink(p)
    }
}

removeDir(path.resolve(__dirname, 'a')).then(data => {
    console.log('async await 删除成功 ', data)
})
