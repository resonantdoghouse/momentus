import React, { Component } from 'react';

class Clock extends Component {
  timeInterval = null;

  state = {
    time: null,
  };

  getTime() {
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const leadingZero = minutes < 10 ? 0 : '';
    const time = `${hour}:${leadingZero}${minutes}`;
    return time;
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: this.getTime(),
      });
    }, 1000);
  }

  render() {
    if (!this.state.time) {
      return <p>Loading</p>;
    }
    return <div className="time">{this.state.time}</div>;
  }
}

export default Clock;
