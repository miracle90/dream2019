let m = require('./a')

// 模块的查找问题

console.log(module.paths)       // 第三方路经查找   1、先去 node_modules    2、依次往上一层文件夹中的 node_modules 查找

let file = require('./bluebird')        // 8版本 文件夹优先级高， 10版本 文件优先级高
// let file = require('./bluebird/index')
console.log(file)

// 如果是第三方模块，会去当前的 node_modules 下找

// 安装包 全局安装 -g 只能在命令行里使用
// 本地安装，在代码里使用（开发依赖 -D，项目依赖 -S（不加就是项目依赖））

// 全局 nrm http-server
// nrm
// 全局安装目录，npm root -g
// 像 node npm 会放到全局变量中，才能在 cmd 中使用

// http-server
// 打包后的文件只能通过服务来看
// 执行 http-server 开启一个服务，后面会手写一个 http-server

// yarn 速度比 npm 快，有缓存功能
// npm instal yarn -g
// 安装之前，包的名字不能和文件夹相同