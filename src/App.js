//import logo from './logo.svg';
import './App.css';
import React from "react";

var hourStyle = {
    "background-color": "red",
    "border-radius": "7px"
};

var minuteStyle = {
    "background-color": "darkgray",
    "border-radius": "10px"
};

var currentHours = new Date().getHours();
var currentMinutes = new Date().getMinutes();
var currentSeconds = new Date().getSeconds();

console.log(currentHours, currentMinutes, currentSeconds);

var sec = {"transform": "rotate("+currentSeconds*6+"deg)"};
var min = {"transform": "rotate("+currentMinutes*6+"deg)"};
var hr = {"transform": "rotate("+currentHours*30+"deg)"};

class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            seconds: currentSeconds,
            minutes: currentMinutes,
            hours: currentHours
        };
    }
    componentDidMount() {
        this.timerId = setInterval(
            ()=> this.mechanism(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    mechanism = () => {
        sec = {"transform": "rotate("+this.state.seconds*6+"deg)"};
        min = {"transform": "rotate("+this.state.minutes*6+"deg)"};
        hr = {"transform": "rotate("+this.state.hours*30+"deg)"};
        this.tick();
    }

    tick = () => {
        if(this.state.hours==12){
            this.setState({
                hours: 0
            });
        }

        if(this.state.minutes==60){
            this.setState({
               minutes:  0,
               hours: this.state.hours + 1
            });
        }
        
        if (this.state.seconds < 60) {
            this.setState({
                seconds: this.state.seconds + 1
            })
        } else {
            this.setState({
                seconds: 1,
                minutes: this.state.minutes + 1
            })
        }
    }

    createStripes = () => {
        var stripes = [];
        //return <div id="stripe"></div>
        for(var i=0; i<=60; i++){
            let a = {"transform": "rotate("+i*6+"deg)"};
            if(i%5===0){
                a["width"]="4px";
                a["background-color"]="white";
            }
            stripes.push(<div style={a} id="stripe"></div>);
        }
        return stripes;
    }

    render() {
        return(
            <div id="display">
                {this.createStripes()}
                <div id="frame">
                    <div style={hr} id="hour">
                        <div style={hourStyle} id="half"></div>
                    </div>
                    <div style={min} id="minute">
                        <div style={minuteStyle} id="half"></div>
                    </div>
                    <div style={sec} id="second">
                        <div id="half"></div>
                    </div>
                    <div id="center"></div>
                </div>
            </div>
        )
    }
}

export default Board;
