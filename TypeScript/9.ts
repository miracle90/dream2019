/**
 * 函数的重载
 * Java 里面重载指的是，两个或两个以上的函数，参数的个数和参数不一样
 * ts 中的函数重载
 */

// 函数的声明
// 重载只是用来限制参数的个数和类型
function attr(key: string): void;
function attr(key: number): void;
function attr(key: boolean): void;
function attr(key: string|number|boolean): void {
    console.log(key)
    if (typeof key === 'string') {
        // ...
    } else {
        // ...
    }
}
attr('lyy')
attr(18)
attr(true)

function parse(str: string): any|never {
    return JSON.parse(str)
}
let obj = parse('{"name": "lyy"}')
console.log(obj)

function multiNum(a: number, b: number): void {
    return undefined
}