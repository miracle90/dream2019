## npm node package manager

- 全局安装 npm root -g 默认安装到 npm 下，只能在命令行中使用

- 本地安装 npm install 

## package.json
- commonjs 查找规范
- 更改版本号 npm version
- 开发一些命令行工具 nrm http-server（把当前文件夹映射到npm全局下）
- 可以通过 npm link 将当前文件夹进行链接

```
#! /usr/bin/env node
告诉当前文件如何执行
```

## 发包
- 切换到国外源 nrm use npm
- 登陆 npm addUser
- 发布 npm publish
- 卸载 npm unpublish --force

## 文件模块

## 核心模块 fs http
- util 工具包 util.inherits 继承 util.promisify