import { takeEvery, put, take } from './redux-saga/effects'
import * as types from './store/action-types'

export default function * rootSaga() {
    for (let i = 0; i < 3; i++) {
        // take 监听一次动作类型 => events once
        let action = yield take(types.ASYNC_ADD)
        yield put({type: types.ADD})
    }
    console.log('已经到达最大数量3')
}

// const delay = ms => new Promise(function(resolve, reject) {
//     setTimeout(resolve, ms)
// })

// export function * minus () {
//     // 产出一个 promise
//     // 当 yield 一个 promise 的时候，程序不会继续执行，而会等待 promise 变成 resolve 态
//     yield delay(1000)
//     // put 相当于 dispatch(action)
//     yield put({type: types.MINUS})
// }
// export function * add () {
//     yield delay(1000)
//     yield put({type: types.ADD})
// }

// // 这是 saga 的唯一入口
// export default function * rootSaga() {
//     // 监听动作，发生时，然后执行对应的 workderSaga => minus 方法
//     yield takeEvery(types.ASYNC_MINUS, minus)
//     yield takeEvery(types.ASYNC_ADD, add)
// }