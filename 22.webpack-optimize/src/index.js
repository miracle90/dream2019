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
let xhr = new XMLHttpRequest()
xhr.open('GET', '/api/user', true)
xhr.onload = function () {
    document.body.innerHTML = xhr.responseText
}
xhr.send()