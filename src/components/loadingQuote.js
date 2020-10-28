import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export class LoadingQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        this.setState(({ minutes }) => ({
          seconds: 100,
        }));
      }
    }, 1000);
  }

  render() {
    return (
      <div className="componentloading">
        <div>
          <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span class="spinner-label">Carregando</span> <br/>
          <br/>        
          <LinearProgress variant="determinate" value={this.state.seconds} />
        </div>
          <span class="spinner-label-text">Por favor aguarde, estamos processando seus dados.</span>        
      </div>
    );
  }
}
