# 异步发展流程
- 同步代码是依次执行，异步就是在同步之后执行的代码

### 异步

### 事件环

### 回调函数 readFile writeFile

### 高阶函数
- 函数可以接收一个函数
- 函数返回一个函数

### promise、promiseA+规范

### 生成器 generator 迭代器

```js
function* foo () {
  var index = 0;
  while (index < 2) {
    yield index++; //暂停函数执行，并执行yield后的操作
  }
}
var bar =  foo(); // 返回的其实是一个迭代器

console.log(bar.next());    // { value: 0, done: false }
console.log(bar.next());    // { value: 1, done: false }
console.log(bar.next());    // { value: undefined, done: true }
```

### async await
