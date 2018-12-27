// fs是一个内置的模块，100左右的方法
// fs file system 文件系统 操作文件
// 创建文件，读文件，写文件，改名，删除，监控文件的变化，文件的状态大小等
// 目录创建，目录删除
// 文件的大小，权限等

let fs = require('fs')

// 文件操作，有一些操作符号 r(read) w(write) 

// chmod -R 777 * 2读的权限 4写的权限 1执行

// 0o666

// fs 文件操作一般都有同步（模块加载）和异步两种情况
// 采用的都是异步方式（不会阻塞主线程，但没同步快）

// 1、读取：fs.readFile fs.readFileSync
// 读取出来的文件内容，默认编码是 null，null表示是 buffer 类型

// fs.readFile('./8.buffer/1.txt', {
//     encoding: 'utf8',
//     flag: 'r'
// }, function (err, data) {
//     console.log(data)
// })

// // 2、写文件：fs.writeFile fs.writeFileSync
// // 写的时候，默认会以 utf8 来写入到文件中
// console.log({}.toString('utf8'))
// fs.writeFile('./8.buffer/write.txt', {}, function () {
    
// })

// 1、编码问题：我们读取的文件可能会有编码问题
// 爬虫，爬别人的网页，人家的网页就是 gbk
//  yarn add iconv-lite 实现编码的转化
let path = require('path')
// let iconv = require('iconv-lite')
// let result = fs.readFileSync(path.resolve(__dirname, 'encoding.txt'))
// // gbk 表示当前编码为 gbk
// let r = iconv.decode(result, 'gbk')        // gbk -> utf8 编码
// console.log(r)

// 2、编码问题：记事本中 gbk- utf8 会出现一个 BOM 头
{/* < Buffer ef bb bf e6 b5 8 b e8 af 95 > */}
function stripBOM(content) {
    if (Buffer.isBuffer(content)) {
        if (content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) return content.slice(3)
    } else {
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1)
        }
    }
    return content
}
let data = fs.readFileSync(path.resolve(__dirname, 'encoding.txt'))
console.log(stripBOM(data).toString())

// 小的文件的拷贝 先读取 再写入
// 先读取到内存中，再把内容全部写入到文件里
let { promisify } = require('util')
let read = promisify(fs.readFile)
let write = promisify(fs.writeFile)
// 不能读取较大的文件 => 流，读取一点写一点
async function copy(source, target) {
    let chunk = await read(path.resolve(__dirname, source))
    await write(path.resolve(__dirname, target), chunk)
}
copy('1.txt', 'write.txt').then(function (data) {
    console.log('拷贝成功 ', data)
})

// fs.writeFile('./1.txt', '1', {flag: 'a'})
// fs.writeFile('./1.txt', '2', {flag: 'a'})
// 把异步方法进行排队处理