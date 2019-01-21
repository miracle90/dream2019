import React, { Component } from 'react'
import { render } from 'react-dom'

// 非受控组件
class UnControl extends Component {
    password = React.createRef()
    handleClick = () => {
        console.log(this.username.value)
        // 这个 current 属性才是真实的 dom 元素
        console.log(this.password.current.value)
        // this.username.value
    }
    render () {
        return <div>
            {/* ref 起别名 */}
            <input type="text" name="username" ref={dom => {this.username = dom}} />
            <input type="text" name="password" ref={this.password} />
            <button onClick={this.handleClick}>添加</button>
        </div>
    }
}

render(<UnControl></UnControl>, window.root)

// 组件间的通信 => 单向数据流
// react生命周期

// eventBus => EventEmitter

// context Api => inject / provide 