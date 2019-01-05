// 向服务器发送 post 请求
let request = require('request')
let options = {
    url: 'http:localhost:8080/post',
    method: 'POST',
    json: true,
    headers: {
        'Content-Type': 'application/json'
    },
    // 请求体放在 body 里
    body: {
        name: 'lyy',
        age: 18
    }
}
request(options, function (err, res, body) {
    console.log(err)
    console.log(body)
})