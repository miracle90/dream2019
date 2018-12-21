let student = {
    name: 'lyy',
    age: 28,
    a: null,
    b: /reg/,
    d: new Date(),
    fn: function () {},
    obj1: {
        obj2: 1
    }
}

function deepClone(obj) {
    // 如果是 undefined 或者 null，null == undefined true
    if (obj == null) return obj     
    // 如果是时间类型
    if (obj instanceof Date) return new Date(obj)
    // 如果是正则
    if (obj instanceof RegExp) return new RegExp(obj)
    // 如果不是对象，不用拷贝，直接 return
    if (typeof obj !== 'object') return obj
    // 如果是对象或者数组,生成一个新的
    let newObj = new obj.constructor
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key])
        }
    }
    return newObj
}
console.log(deepClone(student))