import React from 'react'
import ReactDOM from 'react-dom'

// 如果是一个函数组件，会给你在内部添加一个 render 方法，把函数的返回结果作为 render 方法的返回结果

// 渲染时，如果是组件，默认调用 render 方法
// 继承 React.Component，是一个基类，有生命周期，有更改状态的方法
class Clock extends React.Component {
    // props内部会放到this上
    // constructor (props) {
    //     super()
    //     // 给这个组件声明状态
    //     this.state = {
            // time: new Date().toLocaleString()
    //     }
    // }
    // es7语法
    state = {
        time: new Date().toLocaleString()
    }
    // 生命周期 钩子函数
    componentDidMount () {
        // 更新状态，需要使用父类提供的方法，this.setState
        setInterval(() => {
            // 这种更新状态的方式，只是把最新的状态进行合并，而非覆盖
            this.setState({
                time: new Date().toLocaleString()
            })
        }, 1000);
    }
    render () {
        return <div>
            <h1>当前时间是：{this.state.time} {this.props.a}</h1>
            <button onClick={}>消除时间</button>
        </div>
    }
}

ReactDOM.render(<Clock a="1"></Clock>, window.root)