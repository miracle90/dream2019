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
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    return Person;
}());
var p = new Person('lyy', 18);
console.log(p);
// function Person2(name: string, age: number) {
//     this.name = name
//     this.age = age
// }
// 继承
var Parent = /** @class */ (function () {
    function Parent(name, age) {
        this.name = name;
        this.age = age;
    }
    Parent.prototype.getName = function () {
        return this.name;
    };
    return Parent;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, no) {
        var _this = 
        // 调用父类的构造函数，相当于 es5 中的 call
        _super.call(this, name, age) || this;
        _this.no = no;
        return _this;
    }
    Student.prototype.getNo = function () {
        return this.no;
    };
    return Student;
}(Parent));
var q1 = new Student('lyy', 18, 1);
console.log(q1);
// 属性修饰符
// public，公开的，自己，子类，其他类都能访问
// protected，受保护的，自己，子类能访问，其他人不能访问
// private，私有的，只有自己能访问
var Father = /** @class */ (function () {
    function Father(name, age, money) {
        this.name = '';
        this.name = name;
        this.age = age;
        this.money = money;
    }
    Father.prototype.getName = function () {
        return this.name;
    };
    Father.prototype.getAge = function () {
        return this.age;
    };
    Father.prototype.getMoney = function () {
        return this.money;
    };
    return Father;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child.prototype.getAge = function () {
        return this.age;
    };
    return Child;
}(Father));
var child = new Child('lyy', 18, 1);
console.log(child.name);
console.log(child.getAge());
// 外部，不能访问
// console.log(child.age)
// console.log(child.money)
