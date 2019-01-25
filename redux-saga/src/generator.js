function * gen () {
    console.log('start')
    let a = yield 1
    console.log('yield 1 ', yield 1)
    console.log('yield 1 ')
    let b = yield 2
    console.log('yield 2 ', yield 2)
    console.log('yield 2 ')
    let c = yield 3
    console.log('yield 3 ', yield 3)
    console.log('yield 3 ')
    console.log('end')
}
let it = gen()
console.log('1 ', it.next(1))
console.log('2 ', it.next(2))
console.log('3 ', it.next(3))
console.log('4 ', it.next(4))
console.log('5 ', it.next(5))
console.log('6 ', it.next(6))
console.log('7 ', it.next(7))