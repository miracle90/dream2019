import React, { Component } from 'react'
// import store from '../store'
import * as actions from '../store/actions/todo'
import { connect } from 'react-redux'

// 1、先把 redux 中的状态，变化成 state，每次更新后，调用 setState方法刷新视图
// 2、把更新的方法放到 subscribe 中
class Todo extends Component {
    input = React.createRef()
    // 把redux变成自己的状态
    handleClick = () => {
        // 派发
        // store.dispatch(addTodo(this.input.current.value))
        this.props.addTodo(this.input.current.value)
        this.input.current.value = ''
    }
    handleDelete (i) {
        // 派发
        // store.dispatch(removeTodo(i))
        this.props.removeTodo(i)
    }
    // state = {
    //     todos: store.getState().todo
    // }
    // componentDidMount () {
    //     // 订阅
    //     this.unsub = store.subscribe(() => {
    //         this.setState({
    //             todos: store.getState().todo
    //         })
    //     })
    // }
    // componentWillUnmount () {
    //     this.unsub()
    // }
    render () {
        return (
            <div>
                <input type="text" ref={this.input} /><button onClick={this.handleClick}>添加</button>
                <ul>
                    {this.props.todos.map((item, index) => {
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

// let mapStateToProps = state => {
//     return {
//         todos: state.todo
//     }
// }

// let mapDispatchToProps = dispatch => {
//     return {
//         addTodo: todo => dispatch(actions.addTodo(todo)),
//         removeTodo: i => dispatch(actions.removeTodo(i))
//     }
// }

// 可直接写 actions
export default connect(state => ({todos: state.todo}), actions)(Todo)