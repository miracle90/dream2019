import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ChildCounter extends Component {
    constructor () {
        super()
        console.log('2.child.constructor')
    }
    // 优化
    shouldComponentUpdate () {
        console.log('2.child.shouldComponentUpdate')
        return false
    }
    // 即将被废弃，移到 constructor
    // componentWillMount () {
    //     console.log('2.child.componentWillMount')
    // }
    render () {
        console.log('2.child.render')
        return (
            <div>子组件</div>
        )
    }
    // 发送 ajax
    componentDidMount () {
        console.log('2.child.componentDidMount')
    }
    componentWillReceiveProps (nextProps) {
        // 父组件传递新的属性
        // 1、发送ajax
        // 2、可以把属性转化成状态
        // 官方说法：这个方法被大家滥用，这里不希望用户去掉用 setState

        // 能调用 setState 的方法，只有 constuctor、componentWill、componentDidMount、componentWillReceiveProps
        console.log(nextProps)
        console.log('2.child.componentWillReceiveProps')
    }
}

class Counter extends Component {
    static defaultProps = {

    }
    constructor () {
        super()
        console.log('1.parent.constructor')
        this.state = {
            count: 1
        }
    }
    // constructor 和 componentWillMount 生命周期没什么区别
    // react后续会取消该生命周期
    // ajax也不要写在这里，可能会调用多次
    componentWillMount () {
        console.log('1.parent.componentWillMount')
    }
    render () {
        console.log('1.parent.render')
        return (
            <div>
                <ChildCounter n={this.state.count}></ChildCounter>
                {this.state.count}
                <button onClick={this.handleClick}>增加</button>
            </div>
        )
    }
    componentDidMount () {
        console.log('1.parent.componentDidMount')
    }
    componentWillReceiveProps () {
        console.log('1.parent.componentWillReceiveProps')
    }
    // 做react优化，immutablejs
    // PureComponent 重写了 shouldComponentUpdate
    shouldComponentUpdate (nextProps, nextState) {
        console.log('1.parent.shouldComponentUpdate')
        // 每次调用 setState 都更新视图
        return nextState.count !== this.state.count
    }
    // 用到的极少
    // 更新之前，保存状态
    componentWillUpdate () {
        console.log('1.parent.componentWillUpdate')
    }
    // 用到的极少
    componentDidUpdate () {
        console.log('1.parent.componentDidUpdate')
    }
    componentWillUnmount () {

    }
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
}

ReactDOM.render(<Counter></Counter>, window.root)