import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class List extends Component {
    state = {
        users: JSON.parse(localStorage.getItem('lists')) || []
    }
    render () {
        return (
            <table className="table table-borderd">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map((user, key) => {
                        return (
                            <tr key={key}>
                                <td><Link to={{
                                    pathname: `/user/detail/${user.id}`,
                                    // 这个状态只有点击的时候才有
                                    state: user.username
                                }}>{user.id}</Link></td>
                                <td>{user.username}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}