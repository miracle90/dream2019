export default function createSagaMiddleware () {
    function createChannel () {
        let events = {}
        // 订阅
        function subscribe (actionType, listener) {
            events[actionType] = listener
        }
        // 发布
        function publish (action) {
            let listener = events[action.type]
            if (listener) {
                // 实现只执行一次的效果
                delete events[action.type]
                listener(action)
            }
        }
        return {
            subscribe,
            publish
        }
    }

    let channel = createChannel()

    // 中间件标准结构 store => next => action
    function sagaMiddleware (store) {
        // co 的库
        function run (generator) {
            // 执行生成器，得到迭代器
            let it = generator()
            function next (action) {
                // 重命名，value => effect 副作用
                let { value: effect, done } = it.next(action)
                if (!done) {
                    switch (effect.type) {
                        // 订阅某个动作类型
                        case 'take':
                            channel.subscribe(effect.actionType, next)
                            break
                        case 'put':
                            store.dispatch(effect.action)
                            next()
                            break
                        default:
                            break
                    }
                }
            }
            next()
        }

        sagaMiddleware.run = run
        
        return function (next) {
            return function (action) {
                // store.dispatch
                // 调用 channel 的派发动作，派发 action
                channel.publish(action)
                next(action)
            }
        }
    }
    return sagaMiddleware
}