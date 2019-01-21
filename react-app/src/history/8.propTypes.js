import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Person extends React.Component {
    // 给类赋予默认属性，如果传递了用传递的
    static defaultProps = {
        age: 0
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        gender: PropTypes.oneOf(['male', 'female']),
        hobby: PropTypes.arrayOf(PropTypes.string),
        pos: PropTypes.shape({
            x: PropTypes.string,
            y: PropTypes.number
        }),
        salary (props, propName, component) {
            let salary = props[propName]
            if (salary < 20) {
                throw new Error(`${component} ${propName} too Low`)
            }
        }
    }
    render () {
        let {name, age, hobby, pos, salary} = this.props

        return <div>
            人物：{name} {age}
        </div>
    }
}
let data = {
    name: 'lyy',
    age: 18,
    gender: 'male',
    hobby: ['chuibi', 'haha'],
    pos: {
        x: '100',
        y: 100
    },
    salary: 100
}
// 开发组件，限定属性的类型
ReactDOM.render(<Person {...data}></Person>, window.root)

// 受控组件和非受控组件
// 受状态控制
// 不受状态控制