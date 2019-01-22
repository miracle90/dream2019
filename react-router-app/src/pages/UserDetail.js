import React, { Component } from 'react';

export default class UserDetail extends Component {
    // constructor () {
    //     super()
    // }
    render () {
        return (
            <div>
                {this.props.match.params.uid}<br />
                {this.props.location.state}
            </div>
        )
    }
}