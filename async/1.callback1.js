// 有一个函数可以接收一个函数，可以根据条件选择执行这个函数

// 函数被调用n次后才会执行
function after(times, cb) {
    return function() {
        if (--times === 0) {
            cb()
        }
    }
}
let fn = after(3, function() {
    console.log('fn 被调用了3次')
})
fn();
fn();
fn();

// 读一个文件，3s后才能获取结果
function read(cb) {
    setTimeout(() => {
        let r = 'lyy'
        cb(r)
    }, 3000);
}
read(function(result) {
    console.log(result)
})

// 服务端 node 单线程非阻塞异步 i/o
// 文件读取     fileSystem      异步的不支持 try catch      err是回调的第一个参数
let fs = require('fs')    
fs.readFile('./async/first.txt', 'utf8', function(err, data) {
    console.log(data)
})