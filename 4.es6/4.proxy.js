// Proxy + Reflect 兼容性不好

// 代理 可以重新给属性设置 set get
// 支持数组 支持属性不存在的情况

// let obj = {
//     name: 'lyy'
// }
let obj = ['lyy']
let proxy = new Proxy(obj, {
    // 代理的属性 13 种
    set (target, key, value) {
        if (key === 'length') return true
        console.log('set')
        return Reflect.set(target, key, value)
    },
    get (target, key) {     // 可以使用 reflect
        // return target[key]
        return Reflect.get(target, key)
    }
})

// console.log(proxy.name)
// proxy.name = 'xxx'

// 出现两次，数组长度会变化，另外内容会变
proxy.push('1')     // 深度监控 可以递归 也可以拿到具体的某个对象实现
