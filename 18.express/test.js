let configPath = 'user/:name/:id'

let realPath = '/user/lyy/666'

// {name: 1, id: 2}

let params = []

let regStr = configPath.replace(/:([^\/]*)/g, function () {
    params.push(arguments[1])
    return '([^\/]*)'
})
console.log(params)

let reg = new RegExp(regStr)
let [, ...args] = realPath.match(reg)
console.log(args)

// path-to-RegExp

// 逗号运算符 => 前边赋值，后边结果
let memo = params.reduce((memo, key, index) => (memo[key] = args[index], memo), {})
console.log(memo)