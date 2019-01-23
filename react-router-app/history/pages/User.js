import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import SliderBar from '../components/SliderBar'
import Add from '../pages/Add'
import List from '../pages/List'
import UserDetail from '../pages/UserDetail'

export default class User extends Component {
    state = {
        sliderBarData: [
            {path: '/user/add', content: '用户添加'},
            // {path: '/user/detail', content: '用户详情'},
            {path: '/user/list', content: '用户列表'},
        ]        
    }
    render () {
        return (
            <div>
                <div className="col-md-3">
                    <SliderBar sliderBarData={this.state.sliderBarData}></SliderBar>
                </div>
                <div className="col-md-9">
                    <Switch>
                        {/* 二级菜单，默认展示添加路由 */}
                        <Route path='/user' component={Add} exact />
                        <Route path='/user/add' component={Add} />
                        <Route path='/user/list' component={List} />
                        <Route path='/user/detail/:uid' component={UserDetail} />
                    </Switch>
                </div>
            </div>
        )
    }
}