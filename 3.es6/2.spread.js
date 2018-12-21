// ...可以叫拓展运算符（展开运算符）
// 与之相对的是剩余运算符

// function sum() {
//     let arr = Array.prototype.slice.call(arguments, 1)
//     console.log(Array.isArray(arr))
// }

// 剩余运算符，只能放在最后一项
function sum(...args) {
    // 剩余运算符
    console.log(args)
    // 展开运算符
    console.log(...args)

    let arr = [-1, 0]
    console.log(arr.concat(args))
    console.log([...arr, ...args])
}
sum(1,2,3,4,5)

// 对象
let school = {
    name: 'lyy',
    age: 28
}
let address = {
    address: 'sz'
}
// Object.assign 浅拷贝
console.log(Object.assign(school, address))
// slice方法是个浅拷贝
// ... 运算符，只能展开一层，超过一层，就不能识别了，需要不停地展开拷贝
console.log({...school, ...address})

// 要把一个对象生成一个一模一样的，但是还不能有引用关系
// JSON.stringify -> JSON.parse    function、Date、正则