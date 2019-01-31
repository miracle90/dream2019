/**
 * 如果希望对一个函数的参数和返回值进行约束
 */
interface discount {
    // 传入一个数字，返回一个数字
    (price: number): number
}
let cost: discount = function (price: number): number {
    return price * .8
}
console.log(cost(9))

/**
 * 数组对象的约束
 */
interface userInterface {
    // 索引：数字类型，值为字符串
    [index: number]: string
}
let arr: userInterface = ['lyy1', 'lyy2']
console.log(arr)