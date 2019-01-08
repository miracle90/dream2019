// crypto 核心模块 加密
// md5 不是加密算法，是摘要算法（消息摘要算法）
// md5特点：
// 1、不可逆
// 2、不同的内容加密长度是一样的
// 3、如果内容不相同，那么摘要的结果肯定也是不相同的

let crypto = require('crypto')

// let r = crypto.createHash('md5').update('1234567').digest('base64')
// console.log(r)


// 加盐算法
// 弄一个密码，根据我的密码进行加密，加密 cookie

let fs = require('fs')
// openssl 生成私钥
let s = fs.readFileSync('./rsa/private/key.pem', 'utf8')
let r = crypto.createHmac('sha1', s).update('12345688').digest('base64')
console.log(r)

// 非对称、对称