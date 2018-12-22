// 数据劫持

function update() {
    console.log('数据改变了 刷新试图')
}
let obj = {
    name: 'lyy',
    age: 9
}
// 观察者，把当前对象上的所有属性，都改写成 Object.defineProperty 的形式
function observer(o) {
    // 如果不是对象，直接 return
    if (typeof o !== 'object') return o
    for (let key in o) {
        if (o.hasOwnProperty(key)) {
            defineReactive(o, key, o[key])
        }
    }
}
function defineReactive(obj, key, value) {
    observer(value)     // 只要是对象，就要不停的去监控
    Object.defineProperty(obj, key, {
        get () {
            return value
        },
        set (val) {
            observer(val)       // 只要是对象，就要不停的去监控
            if (val !== value) {
                // 更新视图
                update()
                value = val
            }
        }
    })
}
observer(obj)
obj.name = {name: '哈哈'}
obj.name.name = 'xxx'

// Object.defineProperty 不支持数组
// arr.length -= 1

// 改写数组方法 push slice pop shift unshift
// let push = Array.prototype.push
// Array.prototype.push = function () {
//     update()
//     push()
// }

// Proxy + Reflect 兼容性不好