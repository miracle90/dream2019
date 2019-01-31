function greet(name:string):void {
    console.log(`hello ${name}`)
}
greet('lyy')

// 可选参数 => ? 可给可不给，可选参数一定放后面
function greet2(name: string, age?: number, pos?: string):void {
    console.log(`hello ${name}, age ${age}, work ${pos}`)
}
greet2('lyy', 18, 'IT')
greet2('lyy')

// 默认参数
function ajax(method: string = 'get', url: string) {
    console.log(method, url)
}
ajax(undefined, '/')

// 剩余参数
function sumNum(...args: number[]) {
    return args.reduce((val, item) => {
        return val + item
    }, 0)
}
sumNum(1, 2, 3, 4, 5)