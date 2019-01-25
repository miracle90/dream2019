import * as types from './action-types'

export default {
    add () {
        return {type: types.ADD}
    },
    asyncAdd () {
        // return function (dispatch, getState) {
        //     setTimeout(() => {
        //         dispatch({type: types.ADD})
        //     }, 1000);
        // }
        return {type: types.ASYNC_ADD}
    },
    minus () {
        return {type: types.MINUS}
    },
    asyncMinus () {
        // return function (dispatch, getState) {
        //     setTimeout(() => {
        //         dispatch({type: types.MINUS})
        //     }, 1000);
        // }
        // 派发动作
        return {type: types.ASYNC_MINUS}
    }
}