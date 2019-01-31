"use strict";
/**
 * 函数的重载
 * Java 里面重载指的是，两个或两个以上的函数，参数的个数和参数不一样
 * ts 中的函数重载
 */
function attr(key) {
    console.log(key);
    if (typeof key === 'string') {
        // ...
    }
    else {
        // ...
    }
}
attr('lyy');
attr(18);
attr(true);
function parse(str) {
    return JSON.parse(str);
}
var obj = parse('{"name": "lyy"}');
console.log(obj);
function multiNum(a, b) {
    return undefined;
}
