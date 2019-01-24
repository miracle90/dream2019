import React from 'react'
// umi 的 link 指向 react-router 的 Link
// import { Link } from 'react-router-dom'
import Link from 'umi/link'

export default class Home extends React.Component {
    render () {
        return (
            <div>
                <div>Home</div>
                <Link to="/profile">个人中心</Link>
            </div>
        )
    }
}