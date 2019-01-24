import React from 'react'
import Link from 'umi/link'

export default class UserLayout extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="col-md-3">
                    <ul className="nav nav-stack">
                        <li><Link to="/user/list">用户列表</Link></li>
                        <li><Link to="/user/add">新增用户</Link></li>
                        {/* <li><Link to="/user/detail">新增用户</Link></li> */}
                    </ul>
                </div>
                <div className="col-md-9">
                    {this.props.children}
                </div>
            </div>
        )
    }
}