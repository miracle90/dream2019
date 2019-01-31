/**
 * 传入什么类型，输出什么类型
 * T => type 的缩写
 * generic type
 */
function calculate<T>(value: T): T {
    return value
}
console.log(calculate<string>('lyy'))
console.log(calculate<number>(1))

/**
 * 类的泛型
 */
class MyArray<T> {
    private list: T[] = []
    add(value: T) {
        this.list.push(value)
    }
    max(): T {
        let ret = this.list[0]
        for (let i = 1; i < this.list.length; i++) {
            if (this.list[i] > ret) {
                ret = this.list[i]
            }
        }
        return ret
    }
}
let arr1 = new MyArray<number>()
// arr1.add('')
arr1.add(1)
arr1.add(2)
arr1.add(3)
console.log(arr1.max())

/**
 * 泛型接口
 */
interface Calculate {
    <T>(a: T, b: T): T
}
let add: Calculate = function<T>(a:T, b: T): T {
    return a
}
console.log(add<number>(1, 2))
