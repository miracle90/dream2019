import React, { Component } from 'react';
import Nav from './components/Nav'
// import { Route } from 'react-router-dom'

export default class Home extends Component {
    render () {
        return (
            <div>
                {/* 高阶组件，先渲染Route，后渲染Nav */}
                {/* <Route path="/" component={Nav} /> */}
                <Nav></Nav>
                {/* App中的子组件 */}
                {this.props.children}
            </div>
        )
    }
}