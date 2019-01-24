import React from 'react'
// history
import router from 'umi/router'

export default class Profile extends React.Component {
    render () {
        return (
            <div>
                Profile
                <button onClick={() => router.goBack()}>返回</button>
            </div>
        )
    }
}