// 默认都是 2进制 8进制 16进制
// node 可以操作文件 包括文件的读取
// buffer 内存16进制

// js
// 二进制   0b
// 八进制   0o
// 十六进制 0x

// 实现进制转化
console.log(0b10.toString('16'))       // 会把值变成字符串

// 想把任意一个进制转化成十进制
console.log(parseInt('10101010', '2'))

// base64 编码 把图片转成base64（减少http请求，可以直接把转化的结果放到链接的后面）
// 缺点：转化后的结果会比之前大三分之一
// 编码的转化   1个汉字3个字节，3个字节24位 => 4*6，3个字节转化成4个字节
// Base64编码要求把3个8位字节（3*8=24）转化成4个6位的字节（4*6=24），之后再6位的前面补两个0，形成8位一个字节的形式

let buffer = Buffer.from('亚运')
console.log(buffer)
// 16进制 <Buffer e4 ba 9a e8 bf 90>

// 16进制转成2进制
console.log(0xe4.toString('2'))
console.log(0xba.toString('2'))
console.log(0x9a.toString('2'))
console.log(0xe8.toString('2'))
console.log(0xbf.toString('2'))
console.log(0x90.toString('2'))

// 11100100 10111010 10011010 11101000 10111111 10010000
// 变成 4*6
// 111001 001011 101010 011010 111010 001011 111110 010000     把他再变成10进制，去base64对照表中取值
// 6位，最大2的6次方，加上0，所以称为 base64

// 转化成10进制
console.log(parseInt('111001', '2'))
console.log(parseInt('001011', '2'))
console.log(parseInt('101010', '2'))
console.log(parseInt('011010', '2'))
console.log(parseInt('111010', '2'))
console.log(parseInt('001011', '2'))
console.log(parseInt('111110', '2'))
console.log(parseInt('010000', '2'))
// 57 11 42 26 58 11 62 16

let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
   str += 'abcdefghijklmnopqrstuvwxyz'
   str += '0123456789'
   str += '+/'
console.log(str[57]+str[11]+str[42]+str[26]+str[58]+str[11]+str[62]+str[16])

// base64解码
// 5Lqa6L+Q => 亚运