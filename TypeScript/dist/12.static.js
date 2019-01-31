"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person2 = /** @class */ (function () {
    function Person2() {
    }
    // 静态方法，属于类的属性，可以通过类来调用
    Person2.getNameStatic = function () {
    };
    Person2.prototype.getName = function () {
    };
    // 静态属性
    Person2.myName = 'lyy';
    return Person2;
}());
var p2 = new Person2();
console.log(p2.getName);
console.log(Person2.getNameStatic);
// 多态
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.speak = function () {
        throw new Error('这是一个抽象的基类，不能直接使用');
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.speak = function () {
        console.log('wang');
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.speak = function () {
        console.log('miao');
    };
    return Cat;
}(Animal));
var dog = new Dog();
dog.speak();
var cat = new Cat();
cat.speak();
// 抽象类、抽象方法
// 无法从一个抽象类中实例化对象
var Animal2 = /** @class */ (function () {
    function Animal2() {
    }
    return Animal2;
}());
// 要实现抽象类中的方法
var Cat1 = /** @class */ (function (_super) {
    __extends(Cat1, _super);
    function Cat1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat1.prototype.speak = function () {
        console.log('miao');
    };
    return Cat1;
}(Animal2));
