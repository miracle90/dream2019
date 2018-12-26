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

## 字符 汉字

- 计算机存储的二进制 不是0 就是1 最小单位叫 bit 位，一个字节（byte）8个位
- ASCII(字符 1 2 3 特殊字符 最早只支持127个字符) gb2312 gbk GB18030 Unicode utf8
- gb2312 小于127的用一个字节表示，把连续的两个字节，都大于127的就是汉字，汉字两个字节
- gbk 只要第一个大于127，认为连续的两个就可以是一个汉字，相当于多了很多汉字
- GB18030 gbk的扩展，扩展了一些生僻字，一般用不到
- Unicode 编码，把 ASCII、汉字统一都是两个字节，把所有国家的字符都进行了标识
- utf 标准 utf8，字符一个字节，汉字3个字节，基于 

#### 最后一键 utf8

#### node 只支持 utf8，不支持gbk

## base64 转码
