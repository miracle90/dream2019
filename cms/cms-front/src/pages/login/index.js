import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button, AutoComplete, Cascader } from 'antd'
import styled from 'styled-components'
import { connect } from 'dva'

const { Footer, Content } = Layout
const logo = require('@/assets/firstgrabber.png')
const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option

export default class Login extends React.Component {
    render () {
        return (
            <Layout>
                <Content>
                    <LoginForm />
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Copyright © 2018 蚂蚁金服体验技术部出品
                </Footer>
            </Layout>
        )
    }
}

class LoginForm extends Component {
    state = {
        autoCompleteResult: []
    }
    handleWebsiteChange = (value) => {
        let autoCompleteResult = []
        if (value) {
            autoCompleteResult = ['.com', '.cn', '.org'].map(domain => `${value}${domain}`)
        }
        this.setState({
            autoCompleteResult
        })
    }
    render () {
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            }
        }
        const addresses = [
            {
                value: '广东',
                label: '广东',
                children: [
                    {
                        value: '深圳',
                        label: '深圳'
                    }, 
                    {
                        value: '广州',
                        label: '广州'
                    }
                ]
            },
            {
                value: '山东',
                label: '山东',
                children: [
                    {
                        value: '青岛',
                        label: '青岛'
                    }, 
                    {
                        value: '济南',
                        label: '济南'
                    }
                ]
            }
        ]
        const websiteOptions = this.state.autoCompleteResult.map(item => (<AutoCompleteOption key={item}>{item}</AutoCompleteOption>))
        // 修饰 => this.props.form.getFieldDecorator
        let {form: {getFieldDecorator}} = this.props
        return (
            <FormWrapper>
                <Form onSubmit={this.handleSubmit} style={{width: '500px'}}>
                    <h3>欢迎注册</h3>
                    <FormItem label="用户名" {...formItemLayout}>
                        {
                            getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户名'}]
                            })(<Input prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, 0.25)'}}></Icon>} placeholder="请输入用户名" />)
                        }
                    </FormItem>
                    <FormItem label="密码" {...formItemLayout}>
                        {
                            getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码'}]
                            })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0, 0.25)'}}></Icon>} placeholder="请输入密码" />)
                        }
                    </FormItem>
                    <FormItem label="确认密码" {...formItemLayout}>
                        {
                            getFieldDecorator('confirm', {
                                rules: [{required: true, message: '请输入确认密码'}]
                            })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0, 0.25)'}}></Icon>} placeholder="请输入确认密码" />)
                        }
                    </FormItem>
                    <FormItem label="邮箱" {...formItemLayout}>
                        {
                            getFieldDecorator('email', {
                                rules: [{required: true, message: '请输入邮箱'}]
                            })(<Input prefix={<Icon type="mail" style={{color: 'rgba(0, 0, 0, 0.25)'}}></Icon>} placeholder="请输入邮箱" />)
                        }
                    </FormItem>
                    <FormItem label="家庭住址" {...formItemLayout}>
                        {
                            getFieldDecorator('address', {
                                rules: [{required: true, message: '请输入家庭住址'}]
                            })(<Cascader options={addresses} />)
                        }
                    </FormItem>
                    <FormItem label="手机号" {...formItemLayout}>
                        {
                            getFieldDecorator('phone', {
                                rules: [{required: true, message: '请输入手机号'}]
                            })(<Input prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0, 0.25)'}}></Icon>} placeholder="请输入手机号" />)
                        }
                    </FormItem>
                    <FormItem label="个人网站" {...formItemLayout}>
                        {
                            getFieldDecorator('website', {
                                rules: [{required: true, message: '请输入网址'}]
                            })(<AutoComplete dataSource={websiteOptions} onChange={this.handleWebsiteChange} placeholder="请输入网址">
                                <Input />
                            </AutoComplete>)
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>注册</Button>
                        已有账号？<a href="#">立即登录</a>
                    </FormItem>
                </Form>
            </FormWrapper>
        )
    }
}

LoginForm = Form.create()(LoginForm)

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 70px);
    h3 {
        text-align: center;
    }
    form {
        border: 1px solid #999;
        border-radius: 5px;
        padding: 20px;
    }
`