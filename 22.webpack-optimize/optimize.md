# webpack 优化

### 内置了一些优化项

* scope hosting 作用域提升
* tree shaking 树的摇晃，没用的代码去除掉

### 需要自己配的

* noParse： 如果确定没有依赖，webpack 不做模块依赖查找，提高打包速率
* new webpack.IgnorePlugin

```
// 如果发现 moment 中引入了 locale，忽略掉，就不会打包
new webpack.IgnorePlugin(/\.\/locale/, /moment/),
```

### 第三方插件

* 配置 happypack 默认 webpack 打包，加快打包速度，可以使用 happypack 开启子线程来打包（node 中可以开子进程 => 线程）

```
node 为例

1个进程，会占用 1 核 cpu，8核可以开8个进程，多了没有效果
```

* dllPlugin
* treeshaking
* 公共代码抽离
* 懒加载原理
* 热更新原理
* ast 抽象语法树
* tabpable
* 手写 webpack
* loader 的编写
* loader 的插件