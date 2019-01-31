class Person {
    // 实例的属性
    name: string
    // 实例的属性
    age: number
    constructor (name: string, age: number) {
        this.name = name
        this.age = age
    }
    getName () {
        return this.name
    }
}

let p = new Person('lyy', 18)
console.log(p)

// function Person2(name: string, age: number) {
//     this.name = name
//     this.age = age
// }

// 继承
class Parent {
    name: string
    age: number
    constructor (name: string, age: number) {
        this.name = name
        this.age = age
    }
    getName () {
        return this.name
    }
}
class Student extends Parent {
    no: number
    constructor (name: string, age: number, no: number) {
        // 调用父类的构造函数，相当于 es5 中的 call
        super(name, age)
        this.no = no
    }
    getNo () {
        return this.no
    }
}

let q1 = new Student('lyy', 18, 1)
console.log(q1)

// 属性修饰符
// public，公开的，自己，子类，其他类都能访问
// protected，受保护的，自己，子类能访问，其他人不能访问
// private，私有的，只有自己能访问
class Father {
    public name: string = ''
    protected age: number
    private money: number
    constructor (name: string, age: number, money: number) {
        this.name = name
        this.age = age
        this.money = money
    }
    getName () {
        return this.name
    }
    getAge () {
        return this.age
    }
    getMoney () {
        return this.money
    }
}
class Child extends Father {
    getAge () {
        return this.age
    }
}
let child = new Child('lyy', 18, 1)
console.log(child.name)
console.log(child.getAge())
// 外部，不能访问
// console.log(child.age)
// console.log(child.money)