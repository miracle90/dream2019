// 服务端渲染
// request 是一个模块，封装的是 Http2ServerRequest.request 方法

let request = require('request')
let fs = require('fs')
let url = 'https://juejin.im/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F'

request(url, (err, res, body) => {
    console.log(err)
    console.log(res.statusCode)
    console.log(body)
    fs.writeFileSync('./crawl/tag.html', body)
})
// request(url, (err, res, body) => {
//     // 正则提取
//     let regExp = /class="title" data-v-\w+>(.+)<\/a>?/g
//     let titles = []
//     body.replace(regExp, (matched, title) => {
//         titles.push(title)
//     })
//     console.log(titles)
// })