import * as types from '../action-types'

function reducer(state = [], action) {
    switch (action.type) {
        case types.ADD_TODO:
            // react 中都需要返回一个新的状态 => 更新
            return [...state, action.todo]
        case types.REMOVE_TODO:
            return state.filter((todo, index) => index !== action.index)
        default:
            return state
    }
}

// 测试驱动
// 行为驱动
export default reducer