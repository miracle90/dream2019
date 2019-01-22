// 默认服务端获取的数据，先存放起来
let createStore = (reducer) => {
    // 默认状态是 undefined
    let state
    let listeners = []
    
    // 暴露的获取状态的方法
    let getState = () => JSON.parse(JSON.stringify(state))
    // 拷贝
    // let getState = () => JSON.stringify(state)
    
    // 派发的时候，会传递一个动作
    let dispatch = (action) => {
        // 会通过管理员传入状态和动作，产生一个新的状态
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }
    // 第一次，初始化默认状态
    dispatch({})

    // 订阅
    let subscribe = fn => {
        listeners.push(fn)
        // 返回一个函数，取消订阅
        return () => {
            listeners = listeners.filter(f => f !== fn)
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

// reducer叫纯函数，输入一定，输出一定

let initState = {
    title: {
        content: 'hello',
        color: 'yellow'
    },
    content: {
        content: 'bye',
        color: 'red'
    }
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'changeTitleColor':
            return {...state, title: {...state.title, color: action.color}}
    }
    return state
}

let store = createStore(reducer)
// 取消订阅
let unsub = store.subscribe(render)

function renderTitle() {
    let title = document.getElementById('title')
    title.innerHTML = store.getState().title.content
    title.style.background = store.getState().title.color
}

function renderContent() {
    let content = document.getElementById('content')
    content.innerHTML = store.getState().content.content
    content.style.background = store.getState().content.color
}

function render() {
    renderTitle()
    renderContent()
}

render()

setTimeout(() => {
    store.dispatch({
        type: 'changeTitleColor',
        color: 'green'
    })
    // 取消订阅
    unsub()
}, 1000);
setTimeout(() => {
    store.dispatch({
        type: 'changeTitleColor',
        color: 'blue'
    })
}, 2000);
