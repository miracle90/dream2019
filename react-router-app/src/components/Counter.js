import React, { Component } from 'react'
import store from '../store/index'
import { add, minus, multi } from '../store/actions/counter'

// 1、先把 redux 中的状态，变化成 state，每次更新后，调用 setState方法刷新视图
// 2、把更新的方法放到 subscribe 中
export default class Counter extends Component {
    state = {
        number: store.getState().counter.number
    }
    handleAdd = () => {
        store.dispatch(add(3))
    }
    handleMinus = () => {
        store.dispatch(minus(3))
    }
    handleMulti = () => {
        store.dispatch(multi(3))
    }
    componentDidMount () {
        // 订阅
        store.subscribe(() => {
            this.setState({
                number: store.getState().counter.number
            })
        })
    }
    render () {
        return (
            <div>
                <button onClick={this.handleAdd}>+</button>
                <button onClick={this.handleMinus}>-</button>
                <button onClick={this.handleMulti}>*</button>
                {this.state.number}
            </div>
        )
    }
}