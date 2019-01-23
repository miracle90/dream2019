import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/Counter'
// import Todo from './components/Todo'
import { Provider } from './react-redux'
import store from './store'

// react-redux 的用法，
// 需要在最外层组建上增加 Provider 组件，
// 需要 redux 的组件中，使用 connect 方法来连接

console.log(store)

ReactDOM.render(
<Provider store={store}>
    <>
        <Counter></Counter>
        {/* <Todo></Todo> */}
    </>
</Provider>, window.root)