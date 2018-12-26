## npm

node package manager

- 全局安装 npm root -g 默认安装到 npm 下，只能在命令行中使用
- 本地安装 npm install / npm uninstall <packname> --save-dev(-D)
- npm init -y（-y 自动化配置）

## package.json

- commonjs 查找规范
- MIT 协议
- 更改版本号，通过 npm version major / npm version minor / npm version path
- 开发一些命令行工具 nrm http-server（把当前文件夹映射到 npm 全局下）
- npm link（package.json 下配置 bin）将当前文件夹进行连接，需要加上 

```
#! /usr/bin/env node
```

## 发包

- 切换到国外源
- 登录 npm addUser
- 发布 npm publish / npm unpublish --force

## 核心模块

- fs
- http
- util(inherits 继承 promisify promise化)
