// 解构赋值
let obj = {
    name: 'lyy',
    age: 18
}

// 解构赋值有声明和赋值的两个功能
let { name: Name, age: Age, address = 'sz' } = obj
console.log(Name)
console.log(Age)
console.log(address)

// 数组解构
let arr = [1, 2, 3, {name: 'lyy'}]
let [x, y, z, {name}] = arr
console.log(name)
console.log(x)
console.log(y)
console.log(z)

let { length } = [1, 2, 3]
console.log(length)