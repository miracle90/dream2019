"use strict";
/**
 * 传入什么类型，输出什么类型
 * T => type 的缩写
 * generic type
 */
function calculate(value) {
    return value;
}
console.log(calculate('lyy'));
console.log(calculate(1));
/**
 * 类的泛型
 */
var MyArray = /** @class */ (function () {
    function MyArray() {
        this.list = [];
    }
    MyArray.prototype.add = function (value) {
        this.list.push(value);
    };
    MyArray.prototype.max = function () {
        var ret = this.list[0];
        for (var i = 1; i < this.list.length; i++) {
            if (this.list[i] > ret) {
                ret = this.list[i];
            }
        }
        return ret;
    };
    return MyArray;
}());
var arr1 = new MyArray();
// arr1.add('')
arr1.add(1);
arr1.add(2);
arr1.add(3);
console.log(arr1.max());
var add = function (a, b) {
    return a;
};
console.log(add(1, 2));
