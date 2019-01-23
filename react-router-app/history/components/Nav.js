import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import MenuLink from './MenuLink'

// 高阶组件，组件返回组件
// 可以把公共的功能放到父组件来做，封装公共方法
// let withRouter = (component) => {
//     return () => {
//         return <Route component={component} />
//     }
// }

// @withRouter
class Nav extends Component {
    handleClick = () => {
        console.log(this.props.history)
        this.props.history.push('/')
    }
    render () {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand" onClick={this.handleClick}>
                            路由系统
                        </div>
                    </div>
                    <ul className="navbar-nav nav">
                        <li>
                            <MenuLink to="/" exact>首页</MenuLink>
                        </li>
                        <li>
                            <MenuLink to="/user">用户</MenuLink>
                        </li>
                        <li>
                            <MenuLink to="/profile">个人中心</MenuLink>
                        </li>
                        <li>
                            <MenuLink to="/login">登录</MenuLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

// 如果某个组件，不是通过route来渲染的，但是还想用里面的props，可以使用withRouter
// 可以改写成装饰器的形式
export default withRouter(Nav)

// withRouter
// 权限校验