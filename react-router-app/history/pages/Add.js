import React, { Component } from 'react';

export default class Add extends Component {
    input = React.createRef()
    // constructor () {
    //     super()
    // }
    handleSubmit = (e) => {
        // 阻止默认行为，阻止表单提交
        e.preventDefault()
        let username = this.input.current.value
        let lists = JSON.parse(localStorage.getItem('lists')) || []
        lists.push({
            username,
            id: Math.random()
        })
        localStorage.setItem('lists', JSON.stringify(lists))
        // 使用路由容器（Router）后，路由容器上挂载着一些属性 Provider history
        // Route 组件中可以获取到父级提供的属性，Route来消费，并且把这些属性传递给渲染的组件
        this.props.history.push('/user/list')
    }
    render () {
        console.log(this.props)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" ref={this.input} required />
                    <button className="btn btn-primary">添加</button>
                </form>
            </div>
        )
    }
}

// history go / goBack / push
// location pathname / state跳转所带的数据
// match params / isExact是否严格匹配
