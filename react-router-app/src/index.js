import React from 'react';
// import React, { Component } from 'react';
import { render } from 'react-dom';
// 路由模块，需要一个路由容器，容器标识着使用什么路由 hash browser
// 容器里放的就是路由
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import User from './pages/User'
import Login from './pages/Login'
import App from './App'
import Protected from './Protected'
import 'bootstrap/dist/css/bootstrap.css'

// Router路由盒子，只能有一个根节点
render(<Router>
    <App>
        {/* switch 会判断 path */}
        <Switch>
            {/* 默认路由从上到下匹配，如果匹配到就会渲染对应的组件 */}
            {/* 解决404的问题，在后端处理，可以找不到的话就返回首页，首页会根据当前的路径再次渲染路由 */}
            {/* 希望在路由匹配到后，就不要在继续向下匹配 */}
            <Route path="/" component={Home} exact></Route>
            <Route path="/user" component={User}></Route>
            {/* 高阶组件，判断用户是否登录过 */}
            <Protected path="/profile" component={Profile}></Protected>
            <Route path="/login" component={Login}></Route>
            <Redirect to="/" />
        </Switch>
    </App>
</Router>, window.root)

// BrowserRouter as Router
// HashRouter as Router
// Route
// Redirect
// Switch
// NavLink
// Link
