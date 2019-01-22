import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// 函数组件，参数是属性
// 把 component 拿出来重新命名，组件名必须大写
// props是其他属性
let Protected = ({component: Component, ...props}) => {
    // Route 中可以放置 component
    // 还可以放置 render，它会渲染这个函数的fanhuizhi
    return <Route {...props} render={p => {
        return localStorage.getItem('login') ? <Component {...p} /> : <Redirect to="/login" />
    }} />
}

export default Protected