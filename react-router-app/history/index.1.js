import { createStore } from './redux'

let initState = {number:0}
const ADD = 'ADD'
const MINIS = 'MINIS'

// dispatch({type: 'ADD1'})

function reducer(state = initState, action) {
    switch (action.type) {
        case ADD:
            // react 中都需要返回一个新的状态 => 更新
            return { number: state.number + action.count }
        case MINIS:
            return { number: state.number - action.count }
        default:
            return state
    }
}

let store = createStore(reducer)
window.store = store
let fn = () => {
    window.root.innerHTML = store.getState().number
}
fn()
store.subscribe(fn)
window.add.onclick = function () {
    // type类型，payload载荷
    store.dispatch({ type: ADD, count: 3 })
}
window.minus.onclick = function () {
    // type类型，payload载荷
    store.dispatch({ type: MINIS, count: 3 })
}