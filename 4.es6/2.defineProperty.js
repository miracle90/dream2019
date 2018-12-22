// Object.defineProperty 是一个 es5 的写法

// 在给属性设置值，或者取属性值的时候，做一些操作，不想枚举

let obj = {}
// obj.name = 'lyy'        // 可枚举
let temp = ''

Object.defineProperty(obj, 'name', {
    // 属性描述器
    // value: 'lyy',
    enumerable: true,        // 是否可枚举，默认 false
    configurable: true,      // 是否可配置，默认 false 不可配置（不能删除）
    // writable: true,          // 是否可改写，默认 false
    get () {
        // 如果设置 get，就不能设置 value 和 writable
        console.log('获取属性')
        return temp
    },
    set (value) {
        console.log('属性被改了')
        temp = value
    }
})

// for (let key in obj) {
//     console.log(obj[key])
// }

obj.name = 'set'
console.log(obj.name)

// delete obj.name
// console.log(obj.name)

obj.name = '哈哈'
console.log(obj.name)

// 属性访问器 setter 和 getter
let o = {
    temp: '',
    get name () {
        return this.temp
    },
    set name (val) {
        this.temp = val
    }
}
console.log(o.name)
o.name = 'hello'
console.log(o.name)

// Vue2.0 双向数据绑定
// 数据劫持，所有的属性都定义 set 和 get
// 模板的编译
// 发布订阅 观察者模式