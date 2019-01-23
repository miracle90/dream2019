import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/Counter'
import Todo from './components/Todo'

// class Counter extends Component {
//     render () {
//         return (
//             <div></div>
//         )
//     }
// }

ReactDOM.render(<div>
    <Counter></Counter>
    <Todo></Todo>
</div>, window.root)