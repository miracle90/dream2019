// 前端js可以使用import、export
// 必须大写
// import React from 'react'
// import ReactDOM from 'react-dom'
let React = {
    createElement (type, props, ...children) {
        console.log(type)
        console.log(props)
        console.log(children)
        // 虚拟dom
        return {type, props, children}
    }
}

let render = (obj, container) => {
    if (typeof obj === 'string') return container.appendChild(document.createTextNode(obj))
    let {type, props, children} = obj
    let el = document.createElement(type)
    for(let key in props) {
        el.setAttribute(key, props[key])
    }
    children.forEach(child => {
        // 字符串 or 元素
        // 递归渲染子节点
        render(child, el)
    })
    container.appendChild(el)
}

// console.log(React)
// console.log(ReactDOM)

// 在react中，我们会使用jsx语法
let el = <h1>jsx</h1>
render(el, document.getElementById('root'))
// ReactDOM.render(el, document.getElementById('root'))

// <h1 a="1">jsx<span></span></h1> 
// =>
// React.createElement('h1', {a:1}, 'jsx', React.createElement('span', null, ''))

// 1、jsx 通过 babel 转换成 createElement 形式
// 2、React.createElement 再转换成虚拟节点 VNode
// 3、然后渲染到页面上
