import React from 'react'
import ReactDOM from 'react-dom'

// // 可以直接渲染数组
// // 渲染对象，需要 JSON.stringify

// let arr = ['l', 'yy', '18']

// // key是用来标识身份，DomDiff重排重绘 => 提高性能
// arr = arr.map((item, key) => <li key={key}>{item}</li>)

// ReactDOM.render(arr, window.root)

// 组件：函数组件、类组件
// 方便复用
// 方便维护
// 方便重构
// 把函数叫做组件
// 组件的名字必须大写
// 传参：

// 函数组件 => 缺点：1、没有状态（16.7加入状态），2、没有生命周期的钩子，3、函数组件中没有 this 指向
function School(props) {
    return <h1>学校 {props.color} {props.size}</h1>
}

let data = { color: "red", size: "199" }
ReactDOM.render(<div>
    <div><School color="red" size="199"></School></div>
    <div><School></School></div>
    <div><School {...data}></School></div>
</div>, window.root)

// 钟表

