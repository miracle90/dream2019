import React, { Component } from 'react'
import MessageItem from './MessageItem'

export default class MessageBox extends Component {
    render () {
        return (
            <ul>
                {this.props.messageList.map((item, key) => {
                    // let { avatar, message, date } = item
                    return (
                        <MessageItem {...item} key={key}></MessageItem>
                        // <li className="media" key={key}>
                        //     <div className="media-left">
                        //         <img className="media-object" src={avatar} />
                        //     </div>
                        //     <div className="media-body">
                        //         <h4 className="media-heading">{message}</h4>
                        //         <span>{date}</span>
                        //     </div>
                        // </li>
                    )
                })}
            </ul>
        )
    }
}

// export let a = 100
// export let b = 1000
