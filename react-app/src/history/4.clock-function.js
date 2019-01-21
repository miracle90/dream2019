import React from 'react'
import ReactDOM from 'react-dom'

let Clock = () => {
    return <h1>当前时间是：{new Date().toLocaleString()}</h1>
}

// render方法是优化过的，只更改变化的部分
// 把时间作为组件自己的状态
setInterval(() => {
    ReactDOM.render(<Clock></Clock>, window.root)
}, 1000);
