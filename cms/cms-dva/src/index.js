import React from 'react'
import dva, { connect } from 'dva'

// dva是一个函数
const app = dva()

// const delay = ms => new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         resolve()
//     }, ms);
// })

const get = url => {
    return fetch(url).then(res => res.json())
}

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
        add: (state, {payload = 1}) => ({number: state.number + payload}),
        minus: (state, {payload = 1}) => ({number: state.number - payload})
    },
    // effects 里面放的都是 generator
    // call 表示调用异步函数
    // put 表示 dispatch action
    effects: {
        // 第一个参数是 action 动作对象
        // 第二个 effects => redux-saga/effects
        *addAmount (action, {put, call}) {
            let result = yield call(get, 'http://localhost:3000/amount')

            // 不推荐写法
            // yield delay(1000)
            // yield call(delay, 1000)
            // put 就相当于 store.dispatch
            yield put({type: 'add', payload: +result.data})
        },
        *minusAmount (action, {put, call}) {
            let result = yield call(get, 'http://localhost:3000/amount')

            // 不推荐写法
            // yield delay(1000)
            // yield call(delay, 1000)
            // put 就相当于 store.dispatch
            yield put({type: 'minus', payload: +result.data})
        }
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
            <button onClick={() => props.dispatch({type: 'count/addAmount'})}>addAmount</button>
            <button onClick={() => props.dispatch({type: 'count/minusAmount'})}>minusAmount</button>
        </div>
    )
})

app.router(() => <App />)

app.start('#root')
