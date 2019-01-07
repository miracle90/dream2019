let http = require('http')
let fs = require('fs')
let path = require('path')
let url = require('url')

let obj = {
    'zh-CN': {
        data: '你好'
    },
    'en': {
        data: 'hello'
    },
    'ja': {
        data: 'こんにちは'
    }
}
let defaultLan = 'en'
let server = http.createServer(async function (req, res) {
    // 多语言（语言包）
    // 1、根据路径不同，每个语种对应一个 zh-cn en
    // 2、前端多语言 vue-i18n
    // 3、服务端配置 Accept-Language zh-CN;q=1,zh;q=0.9,en;q=0.8

    let lan = req.headers['accept-language'] || defaultLan
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    if (lan) {
        let lans = lan.split(',').map(l => {
            let [name, q = 'q=1'] = l.split(';')
            return {
                name,
                q: +q.split('=')[1]
            }
        }).sort((a, b) => {
            return b.q - a.q
        })
        console.log(lans)
        for (let i = 0; i < lans.length; i++) {
            let name = lans[i].name
            console.log(name)
            if (obj[name]) {
                return res.end(obj[name].data)
            }
        }
        res.end(obj[defaultLan].data)
    } else {
        res.end(obj[defaultLan].data)
    }
})
let port = 3001
server.listen(port, function () {
    console.log(`server start ${port}`)
})