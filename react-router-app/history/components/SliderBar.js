import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class SliderBar extends Component {
    render () {
        return (
            <nav className="nav nav-stacked">
                {this.props.sliderBarData.map((slide, key) => (
                    <li key={key}><Link to={slide.path}>{slide.content}</Link></li>
                ))}
            </nav>
        )
    }
}