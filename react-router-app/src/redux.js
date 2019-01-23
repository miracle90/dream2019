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

// counter + todo => reducer
// 合并管理员
// 把多个reducer合并成一个，并且合并状态
let combineReducers = reducers => {
    // 合并后还是返回 reducer
    return (state = {}, action) => {
        for (const key in reducers) {
            state[key] = reducers[key](state[key], action)
        }
        return state
    }
}

let bindActionCreators = (actions, dispatch) => {
    let obj = {}
    for (const key in actions) {
        obj[key] = (...args) => dispatch(actions[key](...args))
    }
    return obj
}


export {
    // 创建容器的方法
    createStore,
    combineReducers,
    bindActionCreators
}