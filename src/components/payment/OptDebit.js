import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const OptDebit = (props) => (
  <Grid item xs={12} sm={4}>
    <FormControlLabel
      value="DEBIT"
      control={
        <Radio
          color="primary"
          checked={props.checked === "DEBIT" ? true : false}
        />
      }
      label="Débito Online"
    />
    {/*     <ul className="pgto">
      <li className="pgto-card">
        <img
          alt="santander"
          src={`${require("../../assets/img/pgto/santander.png")}`}
        />
      </li>
      <li className="pgto-card">
        <img
          alt="bradesco"
          src={`${require("../../assets/img/pgto/bradesco.png")}`}
        />
      </li>
      <li className="pgto-card">
        <img
          alt="inter"
          src={`${require("../../assets/img/pgto/inter.png")}`}
        />
      </li>
      <li className="pgto-card">
        <img
          alt="original"
          src={`${require("../../assets/img/pgto/original.png")}`}
        />
      </li>
    </ul> */}
  </Grid>
);

export default OptDebit;
