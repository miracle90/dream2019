import React from 'react'
import dva, { connect } from 'dva'

// dva是一个函数
const app = dva()

// 状态、reducers、effect、subscription
app.model({
    // 命名空间
    // 1、为了防止重名
    // 2、combineReducers 作为 key
    namespace: 'count',
    state: {
        number: 0
    },
    reducers: {
        // 相当于 action，type 参数是老状态，返回值是新状态
        add: state => ({number: state.number + 1}),
        minus: state => ({number: state.number - 1})
    }
})

// connect 来自于 react-redux
// state 是总状态树 {count: {number: 0}}
const App = connect(state => state.count)(props => {
    return (
        <div>
            <h2>{props.number}</h2>
            <button onClick={() => props.dispatch({type: 'count/add'})}>+</button>
            <button onClick={() => props.dispatch({type: 'count/minus'})}>-</button>
        </div>
    )
})

app.router(() => <App />)

app.start('#root')
