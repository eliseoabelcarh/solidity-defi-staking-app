import React, { Component } from "react";
import { Badge } from "react-bootstrap";

export default class Airdrop extends Component {
  constructor() {
    super();
    this.state = {
      time: {},
      seconds: 10,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  secondsToTime(secs) {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));
    let devisor_for_minutes = secs % (60 * 60);
    minutes = Math.floor(devisor_for_minutes / 60);
    let devisor_for_seconds = devisor_for_minutes % 60;
    seconds = Math.ceil(devisor_for_seconds);
    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  toWei = (amount) => window.web3.utils.toWei(amount, "Ether");

  airdropReleaseTokens(){
    let stakingBalance = this.props.stakingBalance
    if(stakingBalance >= this.toWei('50')){
      this.startTimer()
    }
  }

  render() {
   this.airdropReleaseTokens()
    return (
      <p className="fw-bolder mt-3" style={{ fontSize: "0.8rem" }}>
        AIRDROP{" "}
        <Badge bg="secondary">
          {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
         
        </Badge>

      </p>
    );
  }
}
