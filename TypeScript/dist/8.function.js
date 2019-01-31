"use strict";
function greet(name) {
    console.log("hello " + name);
}
greet('lyy');
// 可选参数 => ? 可给可不给，可选参数一定放后面
function greet2(name, age, pos) {
    console.log("hello " + name + ", age " + age + ", work " + pos);
}
greet2('lyy', 18, 'IT');
greet2('lyy');
// 默认参数
function ajax(method, url) {
    if (method === void 0) { method = 'get'; }
    console.log(method, url);
}
ajax(undefined, '/');
// 剩余参数
function sumNum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (val, item) {
        return val + item;
    }, 0);
}
sumNum(1, 2, 3, 4, 5);
