import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import MessageBox from './components/MessageBox'
import MessageInput from './components/MessageInput'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from './context'

// PureComponent
// 如果前后状态是同一个对象，不会更新原来的内容

// 配置公共路径
axios.defaults.baseURL = 'http://localhost:3000'
// axios 请求拦截器
axios.interceptors.request.use(config => {
    config.headers.a = 1
    return config
})
// axios 响应拦截器
axios.interceptors.response.use(res => {
    if (res.data.errorno === '0') {
        return res.data.data
    }
    // 统一处理错误
    return Promise.reject(res)
}, err => {
    // 如果发送失败，把错误向下传递即可
    return Promise.reject(err)
})

// 1、import + export default
// 2、 import {a} + export let a
// 3、import * as a + export let a

class App extends PureComponent {
    state = {
        messageList: [],
        total: 0
    }

    // 获取数据，获取后把数据传递给 MessageBox
    // componentWillMount 已经被废除
    componentWillMount () {
        console.log('Will')
    }

    async componentDidMount () {
        console.log('Did')
        let messageList = await axios.get('/user.json')
        this.setState({
            messageList
        })
    }

    render () {
        console.log('Render')
        return (
            <Provider value={{ add: this.add }}>
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">留言信息</div>
                        <div className="panel-body">
                            <MessageBox messageList={this.state.messageList}></MessageBox>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <MessageInput addMessage={this.addMessage}> </MessageInput>
                    </div>
                    <h2 className="text-center">总点赞数：{this.state.total}</h2>
                </div>
            </Provider>
        )
    }

    addMessage = (val) => {
        let message = {
            avatar: 'https://user-gold-cdn.xitu.io/2018/1/15/160f8c03a28556e0?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
            date: Date.now(),
            message: val
        }
        // 每次更新状态最好产生一个新的状态来覆盖老的状态
        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    add = () => {
        this.setState({total: this.state.total + 1})
    }
}

render(<App></App>, window.root)