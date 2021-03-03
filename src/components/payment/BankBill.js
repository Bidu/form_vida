import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormatDocument, DateToTimestamp, GTM } from "../../helpers";
import { getCardFlag } from "../../helpers/checkout";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Slider, { Range } from "rc-slider";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import { withFormik } from "formik";
import * as Yup from "yup";
import { checkBoxValidate, ConvertCurrency } from "../../helpers";
import { connect } from "react-redux";
import apiIP from "../../services/ip";
import { textMaskPlate } from "../../helpers/user";
import Loading from "../../components/loading";
import moment from "moment";
import { days } from "../../helpers/days";

import {
  textMaskBankAg,
  textMaskCpf,
  textMaskCredit,
  textMaskCredVal,
  textMaskCredCvv,
  textMaskRG,
  textMaskOrgao,
  textMaskUF,
  textMaskChassi,
  textMaskRenavan,
  textMaskNF,
  textMaskDispositivoSeg,
  onlyLetters,
  nameField,
  textMaskCNPJ,
} from "../../helpers/user";
import TooltipDispositivo from "../tooltip";
import bankTokio from "../../helpers/bankTokio";

function PayBankBill(props) {
  const[parcela, setParcela] = useState("")
  const[date, setDate]= useState("")
  const[fatura, setFatura]= useState("")
  React.useEffect(() => {
    console.log(props, "propriedade");
    
  }, []);
  return (
    <div className="pay-credit-card">
      <form>
        <div className="card py1e5 my1e5">
          <p className="bold mb1">Informações de financiamento</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel shrink id="parcelamento">
                Selecione uma opção
              </InputLabel>
              <Select
                name="parcelamento"
                fullWidth
                displayEmpty
                labelId="parcelamento"
                id="parcelamento"
                value={parcela}
                onChange={e =>setParcela(e.target.value)}
                // onBlur={this.handleChange}
                // helperText={
                //   touched.parcelamento ? errors.parcelamento : ""
                // }
                // error={
                //   touched.parcelamento &&
                //   Boolean(errors.parcelamento)
                // }
              >
                {console.log(parcela)}
                <MenuItem value="" disabled>
                  Selecione
                </MenuItem>
                {props.boletopg &&
                  props.boletopg.installmentPlans.map((e) => (
                    <MenuItem
                      value={e.numberOfInstallments}
                    >{` ${e.numberOfInstallments} x R$ ${e.pricePerInstallment} `}</MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Data de Vigência</InputLabel>
              <TextField
                name="date_validity"
                id="date_validity"
                type="date"
                value={date}
                onChange={e =>setDate(e.target.value)}
                
                // value={
                //   // this.props.values.date_validity
                //   //   ? this.props.values.date_validity
                //     : moment(Date.now()).format("YYYY-MM-DD")
                // }
              />
              {console.log(date)}
            </Grid>

            <Grid item xs={6}>
              <p className="bold mb1">
                Vencimento do pagamento para as parcelas
              </p>
              <InputLabel shrink id="data_fatura">
                Selecione uma opção
              </InputLabel>
              <Select
                name="data_fatura"
                fullWidth
                displayEmpty
                labelId="data_fatura"
                id="data_fatura"
                value={fatura}
                onChange={e =>setFatura(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Selecione
                </MenuItem>
                <MenuItem value="UM">1</MenuItem>
                <MenuItem value="DOIS">2</MenuItem>
                <MenuItem value="TRÊS">3</MenuItem>
                <MenuItem value="QUATRO">4</MenuItem>
                <MenuItem value="CINCO">5</MenuItem>
                <MenuItem value="SEIS">6</MenuItem>
                <MenuItem value="SETE">7</MenuItem>
                <MenuItem value="OITO">8</MenuItem>
                <MenuItem value="NOVE">9</MenuItem>
                <MenuItem value="DEZ">10</MenuItem>
                <MenuItem value="ONZE">11</MenuItem>
                <MenuItem value="DOZE">12</MenuItem>
                <MenuItem value="TREZE">13</MenuItem>
                <MenuItem value="QUATORZE">14</MenuItem>
                <MenuItem value="QUINZE">15</MenuItem>
                <MenuItem value="DEZESSEIS">16</MenuItem>
                <MenuItem value="DEZESSETE">17</MenuItem>
                <MenuItem value="DOZOITO">18</MenuItem>
                <MenuItem value="DEZENOVE">19</MenuItem>
                <MenuItem value="VINTE">20</MenuItem>
                <MenuItem value="VINTEUM">21</MenuItem>
                {/* <MenuItem value="VINTEDOIS">22</MenuItem>
                <MenuItem value="VINTETRES">23</MenuItem>
                <MenuItem value="VINTEQUATRO">24</MenuItem>v */}
                {/* <MenuItem value="VINTECINCO">25</MenuItem>
                <MenuItem value="VINTESEIS">26</MenuItem>
                <MenuItem value="VINTESETE">27</MenuItem> */}
                {/* <MenuItem value="VINTEOITO">28</MenuItem>
                <MenuItem value="VINTENOVE">29</MenuItem>
                <MenuItem value="TRINTA">30</MenuItem>
                <MenuItem value="TRINTAUM">31</MenuItem> */}
              </Select>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}
export default PayBankBill;
