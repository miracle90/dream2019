// Set 数组可以放重复的项，Set 中不能放重复的项

let arr = [1,2,3,3]

let set = new Set(arr)

console.log(arr)
console.log(set)
console.log([...set])
console.log(set.entries())

console.log(Object.keys(arr))
console.log(Object.values(arr))

for (let value of set) { // 有迭代器的属性，都可以使用 for of 来迭代
    console.log(value)
}

// 并集
let arr1 = [1, 2, 3, 3]
let arr2 = [3, 3, 4, 5]
// console.log(new Set(arr1.concat(arr2)))
console.log([...new Set([...arr1, ...arr2])])

// 交集
// indexOf实现
console.log([...new Set(arr1)].filter(item => [...new Set(arr2)].indexOf(item) > -1))
// has实现
console.log([...new Set(arr1)].filter(item => new Set(arr2).has(item)))

// 差集
console.log([...new Set(arr1)].filter(item => !([...new Set(arr2)].indexOf(item) > -1)))
console.log([...new Set(arr1)].filter(item => !new Set(arr2).has(item)))

// Map
// 键值对，而且不能重复
let map = new Map([['js', '---'], ['css', '+++']])
map.set('js', 'xxx')
console.log(map)