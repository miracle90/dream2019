### 安装依赖

```
cnpm i react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom -S
cnpm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
cnpm i typescript ts-loader source-map-loader -D
cnpm i redux react-redux @types/react-redux redux-thunk  redux-logger -S
cnpm i connected-react-router -S
```

* @types开头的包都是typeScript的声明文件，可以进入node_modules/@types/XX/index.d.ts进行查看
* ts-loader可以让Webpack使用TypeScript的标准配置文件tsconfig.json编译TypeScript代码。
* source-map-loader使用任意来自Typescript的sourcemap输出，以此通知webpack何时生成自己的sourcemaps,这让你在调试最终生成的文件时就好像在调试TypeScript源码一样。

### tsconfig.json

```
tsc --init
```