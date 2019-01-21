import React, { Component } from 'react'
import { render } from 'react-dom'

// 受控组件和非受控组件 => 表单元素（双向数据绑定）
// 受状态控制
// 不受状态控制

class Control extends Component {
    state = {
        username: 'lyy',
        password: '123456'
    }
    // e 并不是原生的事件，但是可以使用 e.target
    handleChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    render () {
        return <div>
            <input type="text" value={this.state.username} onChange={this.handleChange} />
            {this.state.username}
            <br/>
            <input type="text" value={this.state.password} onChange={this.handleChange} />
            {this.state.password}
        </div>
    }
}

render(<Control></Control>, window.root)