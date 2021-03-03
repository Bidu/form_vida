import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const OptCredit = (props) => (
  <Grid item xs={12} sm={4}>
    <FormControlLabel
      value="CREDITCARD"
      control={
        <Radio
          color="primary"
          checked={props.paymentMode === "CREDITCARD" ? true : false}
          onClick={ () => props.clickC(props.valor) }
        />
      }
      label="Cartão de crédito"
    />
    <ul className="pgto">
      <li className="pgto-card">
        <img alt="visa" src={`${require("../../assets/img/pgto/visa.png")}`} />
      </li>
      <li className="pgto-card">
        <img
          alt="master"
          src={`${require("../../assets/img/pgto/master.png")}`}
        />
      </li>
      <li className="pgto-card">
        <img alt="elo" src={`${require("../../assets/img/pgto/elo.png")}`} />
      </li>
    </ul>
  </Grid>
);

export default OptCredit;
