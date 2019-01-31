"use strict";
// 实现接口
var Dogs = /** @class */ (function () {
    function Dogs(name) {
        this.name = name;
        this.name = name;
    }
    Dogs.prototype.speak = function (sth) {
        console.log('speak');
    };
    Dogs.prototype.fly = function () {
        console.log('fly');
    };
    Dogs.prototype.machineFly = function () {
        console.log('machineFly');
    };
    return Dogs;
}());
var dogs = new Dogs('dog');
console.log(dogs);
