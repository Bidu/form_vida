import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const OptBankSlip = (props) => (
  <Grid item xs={12} sm={4}>
    <FormControlLabel
      value="BILLET"
      control={
        <Radio
          color="primary"
          checked={props.paymentMode === "BILLET" ? true : false}
          onClick={ () => props.clickC(props.valor) }
        />
      }
      label="Boleto"
    />
    <ul className="pgto">
      <li className="pgto-card">
        <img
          alt="visa"
          src={`${require("../../assets/img/pgto/boleto.png")}`}
        />
      </li>
    </ul>
  </Grid>
);

export default OptBankSlip;
