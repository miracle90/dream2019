import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn.js'
import { Consumer } from '../context'

moment.locale('zh-cn')
export default class MessageItem extends Component {
    render () {
        let { avatar, message, date } = this.props
        return (
            <Consumer>
                {obj => {
                    console.log(obj)
                    return (
                        <li className="media">
                            <div className="media-left">
                                <img className="media-object" src={avatar} alt={message} />
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">{message}</h4>
                                <span>{moment(date).fromNow('YYYY-MM-DD hh:mm:ss')}</span>
                                <hr />
                                <button className="btn btn-success" onClick={() => {
                                    obj.add()
                                }}>点赞</button>
                            </div>
                        </li>
                    )
                }}
            </Consumer>
         
        )
    }
}
