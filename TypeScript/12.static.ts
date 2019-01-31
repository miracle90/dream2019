class Person2 {
    // 静态属性
    static myName = 'lyy'
    // 静态方法，属于类的属性，可以通过类来调用
    static getNameStatic () {

    }
    getName () {

    }
}

let p2 = new Person2()
console.log(p2.getName)
console.log(Person2.getNameStatic)

// 多态
class Animal {
    speak () {
        throw new Error('这是一个抽象的基类，不能直接使用')
    }
}
class Dog extends Animal {
    speak () {
        console.log('wang')
    }
}
class Cat extends Animal {
    speak () {
        console.log('miao')
    }
}
let dog = new Dog()
dog.speak()
let cat = new Cat()
cat.speak()

// 抽象类、抽象方法
// 无法从一个抽象类中实例化对象
abstract class Animal2 {
    abstract speak (): void;
}
// 要实现抽象类中的方法
class Cat1 extends Animal2 {
    speak () {
        console.log('miao')
    }
}