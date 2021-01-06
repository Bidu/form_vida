import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import DescriptionIcon from "@material-ui/icons/Description";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export class Steps extends Component {
  render() {
    const { step1, step2, step3, step4, step5 } = this.props;
    return (
      <div className={`stepper ${step5 ? "success" : ""}`}>
        <div className="steps">
          <ul className="flex-container space-between">
            <li className="flex-item">
              <Fab
                className="step-active"
                size="small"
                color="primary"
                aria-label="edit"
              >
                <Link >
                  <PersonIcon />
                </Link>
              </Fab>
            </li>        
            <li class="flex-item">
              <Fab
                className={step3 ? "step-active" : "step-inactive"}
                size="small"
                color={step3 ? "primary" : "lightGray"}
                aria-label="edit"
              >
                {localStorage.getItem("@bidu/condutor") != null || JSON.parse(localStorage.getItem("@bidu2/condutor")).length != 0 ?
                <Link >
                  <DescriptionIcon color="darkGray" />
                </Link> :
                 <Link>
                 <DescriptionIcon />
               </Link>
                }
              </Fab>
            </li>
           
          </ul>
        </div>
        <Grid container spacing={0} className="stepbar-grid">
          <Grid item xs={4}>
            <div className="stepbar step1">
              <div></div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={`stepbar step2 ${step2 ? "active" : ""}`}>
              <div></div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={`stepbar step3 ${step3 ? "active" : ""}`}>
              <div></div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
