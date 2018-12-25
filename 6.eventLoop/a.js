console.log('xxx')

module.exports = 'hello'

// this 指向默认是 module.exports
// console.log(this === module.exports)

// let t = m = {}
// m.a = 'hello'
// m = {name: 1}
// console.log(t)