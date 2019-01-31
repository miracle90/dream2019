"use strict";
/**
 * any 任何的值
 * void 是 any 的反面，不能有任何值
 * never 永远不会有返回值
 */
var k = 10;
function ask() {
    return undefined;
}
// 这个函数一旦开始执行，就不会结束
function sum() {
    while (true) {
        console.log(1);
    }
}
// 函数没有执行完就退出了
function multi() {
    throw Error('error');
    // return 1
}
function divide(a, b) {
    return a / b;
}
divide(10, 2);
divide(10, 0);
