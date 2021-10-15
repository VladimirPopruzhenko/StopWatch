import React, { Component } from "react";
//Класс плиток с цифрами
export default class Plates extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        if(this.props.unitOfTime <= 9) {
            return (
                <div className="Plates">
                    <div className="Digit"><p>0</p></div>
                    <div className="Digit"><p>{this.props.unitOfTime}</p></div>
                </div>
            );
        } else {
            let x = String(this.props.unitOfTime).split("");
            return (
                <div className="Plates">
                    <div className="Digit"><p>{x[0]}</p></div>
                    <div className="Digit"><p>{x[1]}</p></div>
                </div>
            );
        }        
    }
}