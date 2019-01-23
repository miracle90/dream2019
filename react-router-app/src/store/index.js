// store 下的 index 创建容器
import { createStore } from '../redux'
import counter from './reducers/counter'
import todo from './reducers/todo'

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

let reducer = combineReducers({
    counter,
    todo
})

let store = createStore(reducer)

export default store