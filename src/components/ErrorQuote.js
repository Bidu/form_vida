import React from "react";
import Grid from "@material-ui/core/Grid";

const ErrorQuote = (props) => (
  <Grid key={null} item xs={12} sm={6}>
    <div className="list-price-quotation list-price-quotation-error">
      <div className="logo-container">
        <figure className="logo-think">
          <img
            alt="Thinkseg"
            src={`${require(`../assets/img/${props.susep}.svg`)}`}
          />
        </figure>
      </div>
      <div class="warning-quote">Erro na cotação</div>
      <Grid item spacing={0} className="table-header" container>
        <Grid item xs={6}></Grid>
      </Grid>
      <div className="table-body">
        <strong>Ops! Algo não deu certo...</strong>
        {/* <p>{props.msg}</p> */}
      </div>
    </div>
  </Grid>
);

export default ErrorQuote;
