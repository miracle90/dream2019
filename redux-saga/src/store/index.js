import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import createSagaMiddleware from '../redux-saga'
import rootSaga from '../saga'

// 执行函数得到 saga 中间件
let sagaMiddleware = createSagaMiddleware()

// redux-saga 实现异步
// sagaMiddleware 是用来拦截对 saga 中间件请求的，拦截各种 effect
let store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk))
// redux-thunk实现异步
// let store = createStore(reducer, applyMiddleware(thunk))

sagaMiddleware.run(rootSaga)

export default store
