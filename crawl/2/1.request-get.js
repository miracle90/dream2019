let request = require('request')

// 向服务器发送一个 get 请求，请求服务器的数据
request('http://www.baidu.com', function (err, res, body) {
    console.log(res.statusCode)
})