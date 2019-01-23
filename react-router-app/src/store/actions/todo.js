import { ADD_TODO, REMOVE_TODO } from '../action-types'

export function addTodo(todo) {
    return {type: ADD_TODO, todo}
}
export function removeTodo(index) {
    return {type: REMOVE_TODO, index}
}
