import React, { Component } from "react";

export default class Buttons extends Component {
    constructor(props) {
        super(props)        
    }
    render() {
        return (
            <button className="Buttons" id={this.props.id}><p>{this.props.name}</p></button>
        );
    }
}