import * as types from '../action-types'
let initState = { number: 1 }

function reducer(state = initState, action) {
    switch (action.type) {
        case types.ADD:
            // react 中都需要返回一个新的状态 => 更新
            return {
                number: state.number + action.count
            }
        case types.MINUS:
            return {
                number: state.number - action.count
            }
        case types.MULTI:
            console.log('multi')
            return {
                number: state.number * action.count
            }
        default:
            return state
    }
}

export default reducer