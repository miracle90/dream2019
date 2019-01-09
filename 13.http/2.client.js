let http = require('http')
let path = require('path')
let fs = require('fs')

// 下列方法能进行请求
// http.request 有请求体
// http.get() 无请求体，只能发get

const DOWNLOAD_URL = path.join(__dirname, 'load.txt')
let start = 0
let limit = 5
let pause = false
let ws = fs.createWriteStream(DOWNLOAD_URL)
process.stdin.on('data', function (data) {
    if (data.includes('p')) {
        pause = true
    } else {
        pause = false
        // 继续下载
        downLoad()
    }
})
function downLoad() {
    let options = {
        hostname: 'localhost',
        port: 3003,
        method: 'get',
        headers: {
            Range: `bytes=${start}-${limit - 1}`
        }
    }
    http.get(options, function (res) {
        let total = res.headers['content-range'].split('/')[1]
        // 把请求到的结果生成到当前目录下
        res.pipe(ws, {end: false})
        // 累加计算
        start += 5
        limit += 5
        if (start < total && !pause) {
            setTimeout(() => {
                downLoad()
            }, 1000);
        } 
        // else {
        //     ws.end
        // }
    })
}
downLoad()