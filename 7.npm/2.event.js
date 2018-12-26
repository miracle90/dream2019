// node 中的发布订阅 vue eventBus

// 发布订阅模式
// 订阅：数组中放元素，发布：执行
// 保存结果 {'饿了': [], '渴了': []}

let EventEmitter = require('./events')
let util = require('util')
// on 绑定
// emit 发射
// off 取消绑定

// node 主要靠事件驱动，方法大多在原型上

function Girl() {
    // EventEmitter.call(this)
}
util.inherits(Girl, EventEmitter)
let girl = new Girl

// 如果绑定的不是 newListener，需要让当前的 newListener 绑定的方法执行
girl.on('newListener', function (type) {
    console.log('newListener ' + type)
    if (type === '谈恋爱') {
        // 异步编程
        process.nextTick(() => {
            girl.emit('谈恋爱')
        })
    }
})

// 只触发一次
girl.once('失恋', function (a, b, c) {
    console.log(a, b, c)
})
let drink = function () {
    console.log('喝酒')
}
girl.prependListener('谈恋爱', drink)

girl.off('失恋', drink)
setTimeout(() => {
    girl.emit('失恋', 'a', 'b', 'c')
    girl.emit('失恋')
    girl.emit('失恋')
    girl.emit('失恋')
}, 1000);

// 观察者模式，基于发布订阅

// on once emit off newListener (prependListener)

// Object.create(null) 与 {} 的区别
// {} 原型上有很多方法，Ojbect.create(null) 只是一个空的 {}
