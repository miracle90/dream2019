import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// react 数据源，props，state
class Counter extends Component {
    constructor (props) {
        super()
        this.state = {
            num: props.n
        }
    }
    handleClick = () => {
        // 这样只会改变状态，视图不会刷新
        // this.state.num++

        // react批量处理状态
        // setTimeout(() => {
        //     this.setState({num: this.state.num+1})
        //     this.setState({num: this.state.num+1})
        //     this.setState({num: this.state.num+1})
        //     this.setState({num: this.state.num+1})
        //     this.setState({num: this.state.num+1})
        // }, 0);

        // prev写法
        // this.setState(prev => ({num: prev.num + 1}))
        // this.setState(prev => ({num: prev.num + 1}))
        // this.setState(prev => ({num: prev.num + 1}))

        // 回调写法
        this.setState({num: this.state.num + 1}, () => {
            this.setState({num: this.state.num + 1}, () => {
                // todo
            })
        })
    }
    render () {
        return <div>
            {this.state.num}
            <button onClick={this.handleClick}>添加</button>
        </div>
    }
}

ReactDOM.render(<Counter n={100}></Counter>, window.root)