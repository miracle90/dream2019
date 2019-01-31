"use strict";
function greeting(name) {
    console.log("hello " + name + "!");
    // return 'ok'
}
greeting('lyy');
/**
 * never
 * 一般用于抛异常的代码
 */
var xs;
xs = (function () {
    throw new Error('Wrong');
})();
var yy = {
    name: 'lyy'
};
