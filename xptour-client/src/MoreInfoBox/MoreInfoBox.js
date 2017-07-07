import React, { Component } from 'react';
import './MoreInfoBox.css'

class MoreInfoBox extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={this.props.visualState}></div>
        )
    }
}

export default MoreInfoBox