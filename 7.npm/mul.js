function multi(num) {
    let result = function name(x) {
        return multi(num * x)
    }
    result.toString = function () {
        return num
    }
    return result
}

console.log(multi(2) === 2)
console.log(multi(2)(3) === 6)