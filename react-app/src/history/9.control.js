import React, { Component } from 'react'
import { render } from 'react-dom'

// 受控组件和非受控组件 => 表单元素（双向数据绑定）
// 受控组件需要添加 onChange 属性
// 受控好处：
// 1、可以给输入框赋予默认值
// 2、实时校验
// 缺点：
// 1、每次都会调用 setState
// 2、只有按钮点击才需要校验

class Control extends Component {
    state = {
        username: 'lyy',
        password: '123456'
    }
    // e 并不是原生的事件，但是可以使用 e.target
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render () {
        return <div>
            <input type="text" value={this.state.username} onChange={this.handleChange} name="username" />
            {this.state.username}
            <br/>
            <input type="text" value={this.state.password} onChange={this.handleChange} name="password" />
            {this.state.password}
        </div>
    }
}

render(<Control></Control>, window.root)