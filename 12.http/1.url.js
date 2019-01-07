let url = require('url')

let str = 'https://username:password@www.baidu.com:443/index.html?a=1#top'
// 把字符串转化成对象
let { pathname, query, host } = url.parse(str, true)
console.log(pathname)
console.log(query)
console.log(host)

// http 基于 tcp （http 头信息的作用，http 常见状态吗）

// 206 一般叫做范围请求 断点续传
// curl - v--header "Range:bytes=0-3" http: //www.baidu.com

// 304 服务端实现缓存

// 401 没有权限，需要认证，需要登录（判断是否 401 跳转到登录页），jwt权限校验

// 403 服务器拒绝访问对应的资源（登录后但还是没有权限）
