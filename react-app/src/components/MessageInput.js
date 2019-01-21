import React, { Component } from 'react'

export default class MessageInput extends Component {
    message = React.createRef()
    handleClick = () => {
        this.props.addMessage(this.message.current.value)
        this.message.current.value = ''
    }
    render () {
        return <div className="form-group">
            <input type="text" className="form-control" ref={this.message} />
            <button className="btn btn-danger" onClick={this.handleClick}>添加留言</button>
        </div>
    }
}
