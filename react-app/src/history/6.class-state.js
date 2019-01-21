import React from 'react'
import ReactDOM from 'react-dom'

// 如果是一个函数组件，会给你在内部添加一个 render 方法，把函数的返回结果作为 render 方法的返回结果

// 渲染时，如果是组件，默认调用 render 方法
// 继承 React.Component，是一个基类，有生命周期，有更改状态的方法
class Clock extends React.Component {
    // props内部会放到this上
    constructor (props) {
        super()
        // 给这个组件声明状态
        // this.state = {
        //     time: new Date().toLocaleString()
        // }
        // this.handleClick = this.handleClick.bind(this)
    }
    // es7语法
    state = {
        time: new Date().toLocaleString()
    }
    // 生命周期 钩子函数
    componentDidMount () {
        // 更新状态，需要使用父类提供的方法，this.setState
        this.timer = setInterval(() => {
            // 这种更新状态的方式，只是把最新的状态进行合并，而非覆盖
            // setState方法可以导致视图的刷新
            this.setState({
                time: new Date().toLocaleString()
            })
        }, 1000);
    }
    componentWillUnmount () {
        // 在这个生命周期中，删除所有的监听以及卸载绑定的异步方法
        clearInterval(this.timer)
    }
    handleClick = () => {
        // 解决 this 指向
        // 1、模板中 bind
        // 2、construtor 中 bind
        // 3、可以采用箭头函数，es7写法，只要是自己写的原型上的方法
        console.log(this)
        ReactDOM.unmountComponentAtNode(window.root)
    }
    render () {
        return <div>
            <h1>当前时间是：{this.state.time} {this.props.a}</h1>
            <button onClick={this.handleClick}>消除时间</button>
        </div>
    }
}

ReactDOM.render(<Clock a="1"></Clock>, window.root)

// es6 如果把原型上的方法拿出来，这是一个错误的操作
// class A {
//     a () {
//         console.log(this)
//     }
// }
// let a = new A()
// let fn = a.a
// fn()