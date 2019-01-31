import * as React from 'react'
// 连接仓库
import { connect } from 'react-redux'
import actions from '../store/actions/counter'
import { Store } from '../types'

interface IProps {
    number: number,
    increment: any,
    incrementDelay: any,
    decrement: any,
    decrementDelay: any
}

class Counter extends React.Component<IProps> {
    state = {
        number: 0
    }
    render () {
        let {number, increment, decrement, incrementDelay, decrementDelay} = this.props
        return (
            <div>
                <p>{number}</p>
                <button onClick={increment}>+</button>
                <button onClick={incrementDelay}>delay +</button>
                <button onClick={decrement}>-</button>
                <button onClick={decrementDelay}>delay -</button>
            </div>
        )
    }
}

let mapStateToProps = function (state: Store) {
    return state
}
export default connect(mapStateToProps, actions)(Counter)