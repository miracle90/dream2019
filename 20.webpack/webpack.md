# Webpack 

* grunt（基于配置的）
* gulp
* webpack

### webpack 基础用法

* 配置
* loader 转化器
* plugin 插件

### 优化

### ast语法解析

### tapable 钩子函数

### 实现简易的 webpack

### 实现 loader、plugin

### 懒加载、热更新

## webpack 的安装

开发环境安装

```
yarn add webpack webpack-cli -D
```

webpack 用来打包的入口 =》 出口，默认入口文件都在 src 目录

可以实现 0配置

## mode

- dev => 调试（不会压缩，不会优化）
- pro => 会压缩代码 treeshakin没用的代码会移除掉

`webpack 为浏览器实现了一个 require 方法`

## plugin

html插件，打包html，并且把打包后的文件进行引入

```
yarn add html-webpack-plugin -D
```

## babel

```
yarn add @babel/core @babel/preset-env babel-loader -D
```