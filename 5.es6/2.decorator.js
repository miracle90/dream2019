// 装饰器
// 装饰器可以装饰类中的属性和类中的方法和类
// 不能装饰函数

// 装饰类
@flag
class Circle {
    // 装饰属性
    @readOnly PI = 3.14
    // 装饰方法
    @log
    say() {

    }
}

function readOnly(prototype, key, desc) {
    desc.writable = false
    console.log(prototype, key, desc.initializer())
}
function log(prototype, key, desc) {
    let old = desc.value
    desc.value = function () {
        console.log('----')
        old()
    }
    // console.log(prototype, key, desc)
}
function flag(target) {
    console.log(target)
}

let c = new Circle

// 修改类中属性
// Object.defineProperty(c, 'PI', { })
// c.PI = 3.15
console.log(c.PI)

c.say()