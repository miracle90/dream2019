// Buffer 是一个类，挂载在 global 上
// 通过这个类，申请内存，一个汉字3个字节（utf8编码下）
// node 只支持utf8编码，windows操作系统默认gbk
// buffer 的表现形式16进制，01表现的话太长

// 16进制最大？
// 二进制8个1，10进制是255，16进制是 0xff
// 0-9 abcdef

// 用来表示文件内容
// 默认情况下怎么声明buffer
// new Buffer 6.0之前可以使用，不推荐使用这种方式

let buf = Buffer.alloc(6)
console.log(buf)
// 把每一项都填成空位 <Buffer 00 00 00 00 00 00>

// let buf = Buffer.allocUnsafe(6)        // 可能内存中存着个人隐私，但比较快
// console.log(buf)
// 六个随机的值 <Buffer b0 a3 dd f5 d9 02>

// buffer 非常像数组，buffer 是不能扩充的，没有 pop shift...方法，一旦声明不能更改长度

// buffer 可以和字符串完美转化
// 通过字符串来创建一个 buffer
let buffer = Buffer.from('李亚运', 'utf8')
let buffer1 = Buffer.from('李亚运', 'base64')       // 不能转化 base64
console.log(buffer)
console.log(buffer.toString('base64'))
console.log(buffer1)

let bf = Buffer.from([15, 255, 300, 256, -1])        // 不会手动填写
console.log(bf)

// 创建 buffer 的方式，只能通过长度，字符串，数组来创建

// let fs = require('fs')
// fs.readFile('./8.buffer/1.txt', function (err, data) {
//     // 没给 utf8，打印的就是 Buffer
//     console.log(data)
// })

// buffer 常用的方法 length，长度是字节的长度 索引
// Array.isArray => Buffer.isBuffer
// slice (浅拷贝)
// copy concat

console.log(Buffer.from('亚运').length)
console.log(Buffer.isBuffer('亚运'))
console.log(Buffer.isBuffer(Buffer.alloc(6)))

// 通过 slice 方法截取出来的并不是新的内存，而是拿到的截出来的内容
let b = Buffer.from([1,2,3,4])
console.log(b)
let nb = b.slice(0, 1)
nb[0] = 10
console.log(b)

// copy
let bf1 = Buffer.from('亚运')
let bf2 = Buffer.from('有钱')
let bf = Buffer.alloc(6)
// copy 方法是实例上的
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    // 循环多少次，看需要拷贝多少
    for (let i = 0; i < sourceEnd - sourceStart; i++) {
        targetBuffer[targetStart + i] = this[sourceStart + i]
    }
}
bf1.copy(bf, 0, 0, 3)       // 后两个参数不提供，相当于把全部都拷贝进去
bf2.copy(bf, 3, 3, 6)
console.log(bf.toString())
Buffer.concat = function (list, totalLength = list.reduce((prev, next) => prev + next.length, 0)) {
    // 创建一个 buffer，把每个 buffer 拷贝进去
    let bf = Buffer.alloc(totalLength)
    let offset = 0
    list.forEach(item => {
        item.copy(bf, offset)
        offset += item.length
    })
    return bf.slice(0, offset)
}
// Buffer.concat 静态方法，可以把所有的 buffer 进行合并
console.log(Buffer.concat([bf1, bf2, bf1, bf2], 12).toString())     // 拼接完返回的还是一个 buffer

// length isBuffer concat (fill write...)

// indexOf buffer中自带的方法
// split分隔
// 分析数据
let bf = Buffer.from('珠峰我珠峰我珠峰')
let r = bf.indexOf('**', 0)

Buffer.prototype.split = function (seq) {
    let arr = []
    let offset = 0
    let current
    let len = Buffer.from(seq).length
    while (-1 != (current = this.indexOf(seq, offset))) {
        arr.push(this.slice(offset, current).toString())
        offset = current + len
    }
    arr.push(this.slice(offset).toString())
    return arr
}

let bfArr = bf.split('我')
console.log(bfArr)
