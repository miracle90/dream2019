#! /usr/bin/env node

// commander 命令行提示工具 可以帮你处理参数

// 表示当前运行时的参数
// console.log(process.argv)

// --port      -p  知道启动的端口号
// --dir       -d  改执行的目录
// --adress    -a  改主机名
let commander = require('commander')
let version = require('../package.json').version

let args = commander.version(version, '-v, --version')       // 设置版本号
    .option('-p, --port <n>', 'server port')
    .option('-a, --adress <n>', 'server address')
    .option('-d, --dir <n>', 'server show list')
    // command option action 组成一个动作
    // .command('log')
    // .option('-l, --log', 'console.log')
    // .action(function () {
    //     console.log('hellow world')
    // })
    .usage('[options] <lyy-server --port 3000>')

commander.command('log', 'print log')
    .action(function () {
        console.log('log')
    })

commander.command('init', 'init project')
    .action(function () {
        console.log('init')
    })

commander.on('--help', function () {
    console.log('')
    console.log('lyy-server:');
    console.log('  $ lyy-server --port');
    console.log('  $ lyy-server --address');
})
    
commander.parse(process.argv)

// 默认配置
// let config = {
//     ...{
//         dir: process.cwd(),
//         address: 'localhost',
//         port: 8080
//     },
//     ...args
// }
let config = Object.assign({
    dir: process.cwd(),
    address: 'localhost',
    port: 8080
}, args)
// console.log(config)

// 启动一个服务，写一个创建 server 的功能
let Server = require('../src/server.js')
let server = new Server(config)
server.start()

// 发包
// nrm ls
// nrm use npm
// npm addUser
// npm publish
