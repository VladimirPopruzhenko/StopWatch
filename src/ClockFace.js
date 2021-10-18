import React, { Component } from "react";
import Plates from "./Plates";

export default class ClockFace extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seconds: this.props.secondsSum,
        }
        this.setState = this.setState.bind(this)
    }
    setState(newState) {
        this.state.seconds = newState
    }
    giveTimeSec(sec) {
        let seconds = sec % 60;
        if (seconds >= 60) { return 0 }
        else { return seconds }; 
    };
    giveTimeMin(sec) {
        let minutes = Math.trunc(sec / 60);
        if(minutes >= 60) {
            minutes = minutes % 60;
            return Math.trunc(minutes); 
        }
        else { return minutes }  
    };
    giveTimeHours(sec) {
        return Math.trunc(sec / 3600)
    };
    render() {
        this.setState(this.props.secondsSum);
        return (
            <div className="ClockFace">
                    <Plates unitOfTime={this.giveTimeHours(this.state.seconds)}></Plates>  
                    <Plates unitOfTime={this.giveTimeMin(this.state.seconds)}></Plates>  
                    <Plates unitOfTime={this.giveTimeSec(this.state.seconds)}></Plates>
            </div>
        );        
    }
}