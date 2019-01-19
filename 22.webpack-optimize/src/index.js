// 这样写太长了，默认去找 node_modules，找不到再往上找，commonjs 查找规范
// 可以在webpack.config.js 中 resolve 下配置 mainFields
// import 'bootstrap/dist/css/bootstrap.css'
import 'jquery'
import 'bootstrap'
import './style'
import moment from 'moment'
// 其他包忽略掉，只引用这一个包
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
let r = moment(Date.now() - 3600 * 1000 * 2).fromNow()
console.log(r)

// class Person {
//     getName() {
//         return 12322222222
//     }
// }

// let p = new Person()
// console.log(p.getName())

// 调试 es6 代码，需要一个 sourceMap 源码映射
// mozila 出了个包，可以通过报错行数，列数，source => 源码哪里出问题了

// 8080 /api/user => 3000 /api/user
// http-proxy-middleware

// let xhr = new XMLHttpRequest()
// xhr.open('GET', '/api/user', true)
// xhr.onload = function () {
//     document.body.innerHTML = xhr.responseText
    // window.root.innerHTML = xhr.responseText
// }
// xhr.send()

// webpack.DefinePlugin 定义环境变量
let url = ''
if (DEV === 'development') {
    url = 'localhost'
} else {
    url = 'zfpx'
}
console.log(url)
console.log(EXPRESSION)
console.log(FLAG)