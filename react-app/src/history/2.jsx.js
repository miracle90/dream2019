// react jsx语法的应用

import React from 'react'
import {render} from 'react-dom'

// 遇到 < 是一个 html 元素
// 遇到 {} 是一个 js 语法
// js中有很多保留字，关键字 class => className + for => htmlFor
// render 中的最外层只能有一个标签包裹
// style 标签，必须是一个对象元素
// 注释问题
// dangerouslySetInnerHTML
// 可以在页面中使用三元表达式
// 方法 onClick onChange

let name = 'lyy'
let s = '<strong>STRONG</strong>'
let flag = true
let el = (
    // <React.Fragment></React.Fragment>
    <>
        {/* 注释 */}
        <h1 className="color">{name}</h1>
        <h3 style={{color: 'red'}}>
            <label htmlFor="username">
                React.Fragment
                <input type="text" id="username" />
            </label>
        </h3>
        {s}
        <div dangerouslySetInnerHTML={{__html: s}}></div>
        {/* {} 可以取中间内容的返回结果 */}
        {flag ? <h1>正在加载</h1> : <h1>加载完成</h1>}
        {/* IIFE */}
        {(function () {
            return 1000
        })()}
        <button onClick={() => alert(1)}>点击</button>
    </>
)

render(el, document.getElementById('root'))