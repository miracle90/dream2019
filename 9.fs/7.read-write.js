// 我们不希望直接用大量内存操作文件
// 希望读一点，写一点，节约内存

// fs.open 打开文件
// fs.read 读取
// fs.write 写入

let fs = require('fs')
let path = require('path')

// fd 代表的是文件描述符，number类型
// 默认 fd 是从3开始的，前3个被占用了
// 标准输入0，标准输出1，错误输出2

// 0o666 八进制 权限：代表可读可写

// fs.read(fd, buffer, offset, length, position, callback)
// offset 是 buffer 的偏移量
// length 写入的 buffer 的个数

// let buffer = Buffer.alloc(3)
// fs.open(path.resolve(__dirname, 'a.txt'), 'r', 0o666, function (err, fd) {
//     fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead) {
//         // bytesRead 真正读取的个数
//         console.log(bytesRead)
//         console.log(buffer)
//         fs.close(fd, function () {
//             console.log('文件关闭了')
//         })
//     })
// })

// let buffer = Buffer.from('亚运')
// // fs.write(fd, buffer, offset, length, position, callback)
// // offset buffer的偏移量
// // length 写入的 buffer 的个数
// // position 文件的位置
// fs.open(path.resolve(__dirname, 'a.txt'), 'w', function (err, fd) {
//     fs.write(fd, buffer, 0, 3, 0, function (err, written) {
//         // written 真正写入的个数
//         console.log(written)
//         fs.close(fd, function () {
//             console.log('fs.write')
//         })
//     })
// })

// 模拟新的拷贝方法
// 需要用5个字节搞定拷贝操作 => node 进行封装，文件流
function copy(source, target) {
    fs.open(source, 'r', function (err, fd) {
        fs.open(target, 'w', function (err, wfd) {
            let buffer = Buffer.alloc(5)
            let readPosition = 0
            let writePosition = 0
            function next() {
                fs.read(fd, buffer, 0, 5, readPosition, function (err, bytesRead) {
                    if (bytesRead > 0) {
                        readPosition += bytesRead
                        fs.write(wfd, buffer, 0, bytesRead, writePosition, function (err, written) {
                            writePosition += written
                            next()
                        })
                    } else {
                        fs.close(fd, () => {})
                        fs.close(wfd, () => {})
                    }
                })
            }
            next()
        })
    })
}
copy(path.resolve(__dirname, 'a.txt'), path.resolve(__dirname, 'b.txt'))
