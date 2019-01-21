// 默认批量处理
let isBatching = true
class Component {
    constructor () {
        this.state = {n:1}
        this.pendingState = {...this.state}
    }
    setState (obj) {
        // 并不是基于nextTick，只是基于js特性，并没有异步操作
        if (isBatching) {
            this.pendingState = {...this.pendingState, ...obj}
        } else {
            this.state = {...this.state, ...obj}
            this.render()
        }
    }
}
function transaction(c) {
    c.state = c.pendingState
    c.render()
    isBatching = false
}
class My extends Component {
    update() {
        // setTimeout(() => {
            this.setState({n: this.state.n + 1})
            this.setState({n: this.state.n + 1})
            this.setState({n: this.state.n + 1})
            this.setState({n: this.state.n + 1})
            this.setState({n: this.state.n + 1})
        // }, 0);
        // 真正更新试图
        transaction(this)
    }
    render () {
        console.log(this.state)
    }
}
let my = new My()
// 调用组件的渲染方法
my.update()

// setState 时，都是赋值给 pendingState
// isBatching
// pendingState
// state