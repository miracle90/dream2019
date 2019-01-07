// from memory cache
// from disk cache

// Cache-Control, 'no-cache'
// 老版本 Expires，已经废弃了

// 最后修改时间 statObj.ctime.toGMTString()
// 时间变了，内容没变 + 1s内
// Last-Modified + If-Modified-Since
// 304 Not Modified

// Etag + if-None-Match

// 读文件对文件进行加密，太耗性能，结合使用（根据文件大小+文件修改时间 = etag）

let crypto = require('crypto')

// crypto 加密  md5（摘要算法，不能反解）

// 加盐算法

// 弄一个密码，根据我的密码进行加密，加密 cookie

let r = crypto.createHmac('sha1', 'lyy').update('123456').digest('base64')
console.log(r)

// Etag 和 Last-Modified 设置同时生效才可以，有一个就不走缓存

// from memory cache 重启就没了。。。

