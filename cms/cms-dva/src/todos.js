import React from 'react'
import dva, { connect } from 'dva'

// dva是一个函数
const app = dva()

// 状态、reducers、effect、subscription
app.model({
    // 命名空间
    // 1、为了防止重名
    // 2、combineReducers 作为 key
    namespace: 'todoList',
    state: {
        todos: []
    },
    reducers: {
        // 相当于 action，type 参数是老状态，返回值是新状态
        addTodo: (state, {payload}) => {
            localStorage.setItem('todoList', JSON.stringify([...state.todos, { event: payload, completed: false }]))
            return { todos: [...state.todos, { event: payload, completed: false }]}
        },
        removeTodo: (state, {payload}) => {
            let todos = state.todos.filter((item, index) => index !== payload)
            localStorage.setItem('todoList', JSON.stringify(todos))
            return {
                ...state,
                todos
            }
        },
        changeTodo: (state, {payload}) => {
            let todo = state.todos.filter((item, index) => index === +payload.index)
            todo[0].completed = payload.value
            localStorage.setItem('todoList', JSON.stringify([...state.todos]))
            return {
                todos: [...state.todos]
            }
        },
        load (state, {payload}) {
            return {...state, todos: payload}
        }
    },
    // 订阅
    subscriptions: {
        // 当系统启动的时候
        setup ({history, dispatch}) {
            let todos = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : []
            // Warning: dispatch: todoList/load should not be prefixed with namespace todoList
            // 在 model 时派发 action，不需要加命名空间的前缀，可以省略
            dispatch({type: 'load', payload: todos})
        }
    }
})

class Todo extends React.Component {
    add = () => {
        let event = this.content.value
        this.props.dispatch({type: 'todoList/addTodo', payload: event})
        this.content.value = ''
    }
    remove = (i) => {
        this.props.dispatch({type: 'todoList/removeTodo', payload: i})
    }
    changeComplete = event => {
        let value = event.target.checked
        let index = event.target.value
        this.props.dispatch({type: 'todoList/changeTodo', payload: {value, index}})
    }
    render () {
        return (
            <div>
                <input type="text" ref={input => this.content = input} />
                <button onClick={this.add}>Add Todo</button>
                <h2>Todo List</h2>
                <ul>
                    {this.props.todos.map((todo, index) => (
                        <li key={index}>
                            <input type="checkbox" value={index} checked={todo.completed} onChange={this.changeComplete} />
                            {todo.event}
                            <button onClick={this.remove.bind(this, index)}>删除</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

// connect 来自于 react-redux
// state 是总状态树 {todoList: {todos: [], filter: 'all', completed}}
const App = connect(state => state.todoList)(Todo)

app.router(() => <App />)

app.start('#root')
