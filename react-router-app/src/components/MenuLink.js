import React from 'react'
import { Route } from 'react-router-dom'

// props history location match
let MenuLink = ({to, ...p}) => {
    // 不管路径是什么，都需要渲染
    // match 属性，是拿当前的 path，和 to 相等
    return <Route path={to} {...p} children={props => {
        return (
            <div style={{color: 'white'}} 
                 className={props.match ? 'active' : ''}
                 onClick={() => {
                     props.history.push(to)
                 }}>
                {p.children}
            </div>
        )
    }} />
}

export default MenuLink

// 路由渲染的方式
// 1、component 路径匹配到渲染组件
// 2、render 渲染对应的方法的返回值 路径匹配到
// 3、children 不管路径是什么都会渲染