let zlib = require('zlib')
let fs = require('fs')
let path = require('path')

// zlib.createDeflate zlib.createInflate

// let content = fs.readFileSync(path.join(__dirname, 'hello.txt'), 'utf8')
// let r = zlib.gzip(content, function (err, data) {
//     console.log(data)
// })
// console.log(r)

// 创建一个 gzip 转化流
// 先读 => pipe 压缩 => 再写
fs.createReadStream(path.join(__dirname, 'hello.txt'))
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(path.join(__dirname, 'new.zip')))

// 反过来，解压
// 先读 => 解压 => 再写入
// fs.createReadStream(path.join(__dirname, 'new.zip'))
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream(path.join(__dirname, 'new.txt')))