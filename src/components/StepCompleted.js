import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';

export class StepCompleted extends Component {
  render() {
    return (
      <div className="step-completed">
        <div className="content">
          <Grid container spacing={2}>
           <Grid item xs={10} className="left">
                  <span className="light">{this.props.text}</span>&nbsp;<span className="bold">{this.props.bold}</span>
           </Grid>
           <Grid item xs={2} className="right">
              <div className='icon-completed'><DoneIcon /></div>
           </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
