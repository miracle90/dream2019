import React, { Component } from 'react'
import store from '../store'
import { addTodo, removeTodo } from '../store/actions/todo'

// 1、先把 redux 中的状态，变化成 state，每次更新后，调用 setState方法刷新视图
// 2、把更新的方法放到 subscribe 中
export default class Todo extends Component {
    input = React.createRef()
    // 把redux变成自己的状态
    state = {
        todos: store.getState().todo
    }
    handleClick = () => {
        // 派发
        store.dispatch(addTodo(this.input.current.value))
        this.input.current.value = ''
    }
    handleDelete (i) {
        // 派发
        store.dispatch(removeTodo(i))
    }
    componentDidMount () {
        // 订阅
        this.unsub = store.subscribe(() => {
            this.setState({
                todos: store.getState().todo
            })
        })
    }
    componentWillUnmount () {
        this.unsub()
    }
    render () {
        return (
            <div>
                <input type="text" ref={this.input} /><button onClick={this.handleClick}>添加</button>
                <ul>
                    {this.state.todos.map((item, index) => {
                        return <li key={index}>
                            {item}
                            <button onClick={this.handleDelete.bind(this, index)}>x</button>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}