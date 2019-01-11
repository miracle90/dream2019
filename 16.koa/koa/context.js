let context = {

}

// 定义获取器
function defineGetter(key, prop) {
    context.__defineGetter__(prop, function () {
        return this[key][prop]
    })
}

// 给某个属性定义 setter
function defineSetter(key, prop) {
    context.__defineSetter__(prop, function (value) {
        this[key][prop] = value
    })
}

// 如果去 context 上取值，希望去 context.request 上取
// js 有一个不常用的方法，更改获取属性的方式，Object.defineProperty的变种，不会存在覆盖问题
// context.__defineGetter__('url', function () {
//     return this.request.url
// })

// 代理，把取属性的值，通过 request 来获取
defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('request', 'query')

// ctx.body => ctx.response.body
defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = context