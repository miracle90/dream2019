// redux 基础源码
// 核心，所有的状态都是放在容器里管理
// 唯一更改状态通过 dispatch
// 想去更改规则，通过 reducer
let createStore = reducer => {
    let state
    let listeners = []
    let getState = () => state
    let dispatch = action => {
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }
    let subscribe = fn => {
        listeners.push(fn)
        return () => {
            listeners = listeners.filter(f => f !== fn)
        }
    }
    dispatch({})
    return {
        getState,
        dispatch,
        subscribe
    }
}

// redux