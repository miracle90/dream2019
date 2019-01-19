import React from 'react'
import ReactDOM from 'react-dom'

let arr = ['l', 'yy', '18']

arr = arr.map(item => <li>{item}</li>)

ReactDOM.render(arr, window.root)
