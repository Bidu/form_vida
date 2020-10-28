import React, { Component } from "react";

const genSlideStyle = (value) => {
  return {
    point: {
      left: `calc(${value * 20}% - ${5 + 3 * value}px)`,
    },
    range: {
      width: `${value * 20}%`,
    },
  };
};

export class RangeBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 1,
    }
  }
  
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }
  
  render () {
    const slideStyle = genSlideStyle(this.state.value);
    return (
      <div className="range">
        <span className="range-value" style={slideStyle.range} />
        <span className="circle" style={slideStyle.point} />
        <input
          className="range-slide"
          name="range"
          type="range"
          min="0"
          max="5"
          value={this.state.value}
          step="1"
          onChange={this.handleChange}
        />		
      </div>
    );
  }
}

