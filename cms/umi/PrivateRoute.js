import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * Route中渲染组件有三种配置方式
 * 1、component
 * 2、render
 * 3、children：路径是否匹配，都会渲染
 * <Route path="/a" render={props => <div>组件</div>}></Route>
 * <Route children={props => <div>组件</div>}></Route>
 */
export default (props) => {
    let {render, ...rest} = props
    // 渲染有两个条件，1、是否登陆，2、路径是否匹配
    return (
        <Route render={props => localStorage.getItem('login') ? render(props) : <Redirect to="/login"></Redirect>} />
    )
}