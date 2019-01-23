// store 下的 index 创建容器
import { createStore, combineReducers } from '../redux'
import counter from './reducers/counter'
import todo from './reducers/todo'
// import { combineReducers } from 'redux'

let reducer = combineReducers({
    counter,
    todo,
})

let store = createStore(reducer)

export default store