import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
// redux 两个异步解决方案：1、redux-thunk，2、redux-saga
import thunk from 'redux-thunk'
// 打印日志
import logger from 'redux-logger'

let store = createStore(reducer, applyMiddleware(thunk, logger))

export default store