let obj = {}

Object.defineProperty(obj, 'then', {
    get () {
        throw new Error()
    }
})

let p = new Promise((resolve, reject) => {
    resolve('hello')
})

p.then(function (data) {
    console.log(data)
}, function (err) {
    console.log(err)
})