// context上下文，在父级的上下文中定义好数据，子组件可以直接拿到
import React from 'react'

// 创建上下文，产生的是组件
let { Provider, Consumer } = React.createContext()

// 提供
// context.Provider
// 消费
// context.Consumer

export {
    Provider,
    Consumer
}