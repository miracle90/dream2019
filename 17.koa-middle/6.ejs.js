let fs = require('fs')
let path = require('path')

let tplStr = fs.readFileSync(path.join(__dirname, 'template.ejs'), 'utf8')

function render(str, data) {
    // .+ 任意字符，至少一个 ? 尽可能少匹配
    return str.replace(/<%=(.+?)%>/g, function () {
        // console.log(arguments)
        return data[arguments[1]]
    })
}

console.log(render(tplStr, {name: 'lyy'}))
