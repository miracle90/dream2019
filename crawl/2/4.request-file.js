// 如果我们要向服务器提交文件的话，multipart/form-data
let request = require('request')
let fs = require('fs')

let formData = {
    name: 'lyy',
    avatar: {
        value: fs.createReadStream('avatar.jpg'),
        options: {
            
        }
    }
}
