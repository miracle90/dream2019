// node 中的发布订阅 vue eventBus

// 发布  找到对应要执行的事情进行触发
// 订阅  保存结果  {'饿了': ['买饭'， ‘吃饭’], '渴了': ['喝水']}

let EventEmitter = require('./events.js')
// let EventEmitter = require('events')
let util = require('util')
// on 绑定 emit 发射 off 取消绑定       node 主要靠事件驱动
function Girl() {
    EventEmitter.call(this)
}
util.inherits(Girl, EventEmitter)
let girl = new Girl
girl.on('失恋', function() {
    console.log('cry')
})
let drink = function () {
    console.log('喝酒')
}
girl.on('失恋', drink)
girl.off('失恋', drink)
setTimeout(() => {
    girl.emit('失恋')
}, 1000)