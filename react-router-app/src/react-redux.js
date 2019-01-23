import React from 'react'
import { bindActionCreators } from './redux';

let Context = React.createContext()

// 提供的父组件
class Provider extends React.Component {
    render () {
        // 使用了 contextApi
        return <Context.Provider value={this.props.store}>
            {this.props.children}
        </Context.Provider>
    }
}

let connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
    // 当前 connect 返回的是一个组件
    return () => {
        // Proxy中拥有了状态
        class Proxy extends React.Component {
            state = this.props.store.getState()
            componentDidMount () {
                this.unsub = this.props.store.subscribe(() => {
                    this.setState(this.props.store.getState())
                })
            }
            componentWillUnmount () {                
                this.unsub()
            }
            render () {
                let act
                if (typeof mapDispatchToProps === 'function') {
                    act = mapDispatchToProps(this.props.store.dispath)
                } else {
                    act = bindActionCreators(mapDispatchToProps, this.props.store.dispatch)
                }
                return <Component
                    {...mapStateToProps(this.state)}
                    // {...mapDispatchToProps(this.props.store.dispath)}
                    {...act}
                ></Component>
            }
        }

        // 父组件提供，子组件消费
        return <Context.Consumer>
            {/* store 就是 redux 中的 store */}
            {store => {
                // return <Component
                // {...mapStateToProps(store.getState())}
                // {...mapDispatchToProps(store.dispath)}
                // ></Component>
                return <Proxy store={store}></Proxy>
            }}
        </Context.Consumer>
    }
}

export {
    Provider,
    connect
}