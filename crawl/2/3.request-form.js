// 向服务器发送 post 请求，请求体的格式是表单
let request = require('request')
let options = {
    url: 'http:localhost:8080/form',
    method: 'POST',
    json: true,
    headers: {
        'Content-Type': 'application/x-www-urlencoded'
    },
    // 请求体放在 form 里
    form: {
        name: 'lyy',
        age: 18
    }
}
request(options, function (err, res, body) {

})