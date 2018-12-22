// es6 => this 闭包 作用域 继承
// es6 中的类

// 判断是否为 new 调用
// function _check(instance, construct) {
//     if (!(instance instanceof construct)) {
//         throw new TypeError(`Class constructor Fn cannot be invoked without 'new'`)
//     }
// }
// function Fn() {
//     _check(this, Fn)
// }
// new Fn()

class Animal {      // es6只支持静态的方法 并不支持静态属性 Animal.a = 1(es7支持)
    constructor (val) {
        this.name = val
    }
    static a = 1        // es7语法
    age = 9
    static a() {
        return 1
    }
    eat() {     // 原型上的方法
        console.log('吃')
    }
}
// Animal.prototype.eat = function () {}

let animal = new Animal('动物')
animal.eat()
// 静态方法不需要 new，直接调用
console.log(Animal.a())

// es6 中的继承会继承实例上的和原型上的（包括静态方法）
class Cat extends Animal {
    constructor(name) {
        // super(name)     // Animal.call(this)
    }
}
let c = new Cat('小猫')
console.log(Cat.a())
console.log(c.name)
console.log(Animal.a)

// @babel/core babel核心包
// @babel/cli babel命令行工具
// @babel/preset-env es6...转换成es5