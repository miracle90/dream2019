import React, { Component } from 'react'
// import store from '../store/index'
import * as actions from '../store/actions/counter'
// contextApi 16.3版本
import { connect } from '../react-redux'
// import { bindActionCreators } from 'redux'
// import { bindActionCreators } from '../redux'

// 1、先把 redux 中的状态，变化成 state，每次更新后，调用 setState方法刷新视图
// 2、把更新的方法放到 subscribe 中
class Counter extends Component {
    // state = {
    //     number: store.getState().counter.number
    // }
    // componentDidMount () {
    //     // 订阅
    //     store.subscribe(() => {
    //         this.setState({
    //             number: store.getState().counter.number
    //         })
    //     })
    // }
    handleAdd = () => {
        // store.dispatch(add(3))
        this.props.add(3)
    }
    handleMinus = () => {
        // store.dispatch(minus(3))
        this.props.minus(3)
    }
    handleMulti = () => {
        // store.dispatch(multi(3))
        this.props.multi(3)
    }
    render () {
        return (
            <div>
                <button onClick={this.handleAdd}>+</button>
                <button onClick={this.handleMinus}>-</button>
                <button onClick={this.handleMulti}>*</button>
                {this.props.number}
            </div>
        )
    }
}

// 这两个方法的返回值，会作为 Counter 的属性
// let mapStateToProps = state => {
//     return {
//         number: state.counter.number
//     }
// }
// let mapDispatchToProps = dispatch => {
//     return {
//         add (val) {
//             dispatch(actions.add(val))
//         },
//         minus (val) {
//             dispatch(actions.minus(val))
//         },
//         multi (val) {
//             dispatch(actions.multi(val))
//         }
//     }
// }

// let bindActionCreators = (actions, dispatch) => {
//     let obj = {}
//     for (const key in actions) {
//         obj[key] = (...args) => dispatch(actions[key](...args))
//     }
//     return obj
// }

// 默认可以在 connect 返回的组件中拿到 Provider 提供的 store
// export default connect(state => ({number: state.counter.number}), dispatch => bindActionCreators(actions, dispatch))(Counter)

// 直接传 actions
export default connect(state => ({number: state.counter.number}), actions)(Counter)