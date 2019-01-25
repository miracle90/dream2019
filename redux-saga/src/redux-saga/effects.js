export function take (actionType) {
    return {
        type: 'take',
        actionType
    }
}
export function put (action) {
    return {
        type: 'put',
        action
    }
}