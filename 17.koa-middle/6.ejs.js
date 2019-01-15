let fs = require('fs')
let path = require('path')

let tplStr = fs.readFileSync(path.join(__dirname, 'template.ejs'), 'utf8')

function render(tplStr, obj) {
    // .+ 任意字符，至少一个 ? 尽可能少匹配
    // return str.replace(/<%=(.+?)%>/g, function () {
    //     // console.log(arguments)
    //     return data[arguments[1]]
    // })

    // 拼接了一个大的字符串，并且用 with 来包裹，需要让这个字符串执行
    // new Function + 正则 + 字符串拼接
    let head = `with(obj){\r\n`
    head += "var str = `"
    let content = tplStr.replace(/<%=(.+?)%>/g, function () {
        return '${' + arguments[1] + '}'
    })
    content = content.replace(/<%(.+?)%>/g, function () {
        return '`\r\n' + arguments[1] + '\r\nstr+=`'
    })
    let tail = '`\r\n}\r\n return str;'
    let total = head + content + tail
    let fn = new Function('obj', total)
    return fn(obj)
}
console.log(render(tplStr, {arr: [1,2,3]}))

// console.log(render(tplStr, {name: 'lyy'}))

// let obj = { arr: [1, 2, 3] }
// with (obj) {
//     let str = `<!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <meta http-equiv="X-UA-Compatible" content="ie=edge">
//                 <title>Document</title>
//             </head>
//             <body>`
//     arr.forEach(item => {
//         str += `<li>
//             1
//         </li>`
//     })
//     str += `</body></html>`
//     console.log(str)
// }

// let str = `let a = 1;
// return a`
// let fn = new Function('e', str)
// console.log(fn.toString())