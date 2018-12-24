class Parent {
    // static a = 'hello'       // es7 语法
    // a = 'hello'              // es7 语法
    constructor (age) {
        this.age = age
    }
    drink = () => {             // es7 语法，保证 this 指向的正确性
        console.log(this)
    }
}

// extends 默认会继承实例上的属性和原型上的属性

// 子类继承父类的静态方法
// Child.__proto__ = Parent
class Child extends Parent {
    // 如果需要传参，则须写constructor，写 constructor 必须写 super
    constructor(val) {
        super(val)
    }
}

let child = new Child(5)

let drink = child.drink() // 不能把原型上的方法拿出来调用，否则 this 无指向
drink()

// console.log(child.drink())

// static 属性是 es7 提供的
// babel 把 es6 => es5      @babel/core     @babel/cli      @babel/preset-env 把 es6+ 转化成低级语法
// 自己安装其他插件

//  npx babel 1. class.js - o 1. class - es5.js
// 命令行命令：
// npx：执行.bin目录下的任意一个文件
// babel：.bin 目录下的命令
// 1.class.js：源文件名
// -o：输出
// 1.class-es5.js：编译后的文件名

// static = 'hello' 为 es7 语法，需要以下插件，需要在 .babelrc 下配置
// @babel/plugin-proposal-class-properties

console.log(Parent.a)
console.log(Child.a)
console.log(child.a)
console.log(child.__proto__.a)
