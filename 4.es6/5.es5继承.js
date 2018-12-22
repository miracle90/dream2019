// 构造函数模拟类的 实例都是通过 new 产生的

// 实例上的属性，类上的属性（静态属性），公共属性

// function Animal(name) {
//     this.name = name
// }

// Animal.prototype.age = { time: 100}

// let dog1 = new Animal('狗1')
// let dog2 = new Animal('狗2')

// console.log(dog1.age === dog2.age)

// console.log(dog1.__proto__ === Animal.prototype)
// console.log(dog1.__proto__.constructor === Animal)
// console.log(Animal.prototype.__proto__ === Object.prototype)
// console.log(Animal.prototype.__proto__.__proto__ === null)

// 继承
function Animal(name) {
    this.name = name
}
Animal.prototype.age = {time: 100}

function Dog(name) {

}

// 1、继承实例上的属性
// function Dog(name, ) {
//     Animal.call(this, name)
// }
// let dog = new Dog('旺旺')
// console.log(dog)

// 2、继承公共方法
// ES5 写法
// Dog.prototype.__proto__ = Animal.prototype
// ES5另外一种写法
// function create(parentPrototype) {
//     function Fn() {}        // 创建一个空类，把原型附上去
//     Fn.prototype = parentPrototype
//     return new Fn()     // 创建的实例，只有公共方法
// }
// Dog.prototype = Object.create(Animal.prototype, {
//     constructor: { 
//         value: Dog
//     }
// })
// // Dog.prototype = create(Animal.prototype)
// // // ES6 写法
// // Object.setPrototypeOf(Dog.prototype, Animal.prototype)
// let dog = new Dog('旺旺')
// console.log(dog.age)

// 3、实例上属性 + 公共方法
// Dog.prototype = new Animal('xxxx')        // 不推荐
// call + 原型继承