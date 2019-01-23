import { ADD, MINUS, MULTI } from '../action-types'

export function add(n) {
    return {type: ADD, count: n}
}
export function minus(n) {
    return {type: MINUS, count: n}
}
export function multi(n) {
    return {type: MULTI, count: n}
}
