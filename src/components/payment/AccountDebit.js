import React, { Component, useState  } from "react";
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

function PayAccountDebit(props) {
  const[parcela, setParcela] = useState("")
  const[date, setDate]= useState("")
  const[fatura, setFatura]= useState(null)
  const [banco, setBanco] = useState(null)
  const [agencia, setAgencia] = useState(null)
  const [digito, setDigito] = useState(null)
  const [conta, setConta] = useState(null)
  const [contaDig, setcontaDig] = useState(null)
  const [nomeTitular, setNomeTitular] = useState("")
  const [relacao, setRelacao] = useState("")
  const [nomeCompleto, setNomeCompleto] = useState("")
  const [cpfTitular, setCpfTitular] = useState("")
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
                // onChange={handleChange("parcelamento")}
                // onBlur={this.handleChange}
                // helperText={
                //   touched.parcelamento ? errors.parcelamento : ""
                // }
                // error={
                //   touched.parcelamento &&
                //   Boolean(errors.parcelamento)
                // }
              >
                <MenuItem value="" disabled>
                  Selecione
                </MenuItem>
                {props.contapg &&
                  props.contapg.installmentPlans.map((e) => (
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
              </Grid>

            <Grid item xs={6} sm={6}>
              <p className="bold mb1">Banco</p>
              <InputLabel shrink id="gender">
                  Banco
                </InputLabel>
                <Select
                  name="banco"
                  fullWidth
                  displayEmpty
                  labelId="banco"
                  id="banco"
                  value={banco}
                  onChange={e =>setBanco(e.target.value)}
                  // value={
                  //   this.props.values.banco
                  //     ? this.props.values.banco
                  //     : "Não informado"
                  // }
                  // onChange={handleChange("banco")}
                  // onBlur={this.handleChange}
                  // helperText={touched.banco ? errors.banco : ""}
                  // error={touched.banco && Boolean(errors.banco)}
                >
                  <MenuItem value="Selecione" disabled>
                    Selecione
                  </MenuItem>
                  {bankTokio.map((e, key) => (
                    <MenuItem value={e.bank}>{e.bank}</MenuItem>
                  ))}
                </Select>
            </Grid>
            <Grid item xs={3} sm={3}>
              <p className="bold mb1">Agência</p>
              <TextField
                  // value={
                  //   this.props.values.agencia ? this.props.values.agencia : ""
                  // }
                  id="agencia"
                  label="Agência"
                  placeholder="000000"
                  fullWidth
                  name="agencia"
                  value={agencia}
                  onChange={e =>setAgencia(e.target.value)}
                  
                  // onChange={handleChange}
                  // onBlur={this.informacaoPagamento}
                  // helperText={touched.agencia ? errors.agencia : ""}
                  // error={touched.agencia && Boolean(errors.agencia)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskBankAg,
                  }}
                />
            </Grid>
            <Grid item xs={3} sm={3}>
              <p className="bold mb1">Dígito</p>
              <TextField
                  // value={
                  //   this.props.values.agencia ? this.props.values.agencia : ""
                  // }
                  id="digito"
                  label="Dígito"
                  placeholder="0"
                  fullWidth
                  name="digito"
                  value={digito}
                  onChange={e =>setDigito(e.target.value)}
                  // onChange={handleChange}
                  // onBlur={this.informacaoPagamento}
                  // helperText={touched.agencia ? errors.agencia : ""}
                  // error={touched.agencia && Boolean(errors.agencia)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // InputProps={{
                  //   inputComponent: textMaskBankAg,
                  // }}
                />
            </Grid>
            <Grid item xs={6} sm={6}>
            <p className="bold mb1">Conta Corrente</p>
                <TextField
                  // value={this.props.values.conta ? this.props.values.conta : ""}
                  id="conta"
                  label="Conta"
                  placeholder="0000000000"
                  fullWidth
                  name="conta"
                  value={conta}
                  onChange={e =>setConta(e.target.value)}
                  // onChange={handleChange}
                  // onBlur={this.informacaoPagamentoConta}
                  // onFocus={this.withoutHyphen}
                  // withoutHyphen
                  // helperText={touched.conta ? errors.conta : ""}
                  // error={touched.conta && Boolean(errors.conta)}
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}

                /*                   InputProps={{
              inputComponent: agencyAccount,
            }} */
                />
              </Grid>
              <Grid item xs={3} sm={3}>
              <p className="bold mb1">Dígito</p>
              <TextField
                  // value={
                  //   this.props.values.agencia ? this.props.values.agencia : ""
                  // }
                  id="digito_conta"
                  label="Dígito"
                  placeholder="0"
                  fullWidth
                  name="digito_conta"
                  value={contaDig}
                  onChange={e =>setcontaDig(e.target.value)}
                  // onChange={handleChange}
                  // onBlur={this.informacaoPagamento}
                  // helperText={touched.agencia ? errors.agencia : ""}
                  // error={touched.agencia && Boolean(errors.agencia)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // InputProps={{
                  //   inputComponent: textMaskBankAg,
                  // }}
                />
            </Grid>
            <Grid item xs={6} sm={6}>
              <p className="bold mb1">Nome do Titular do Cartão</p>
              <TextField
                type="text"
                id="nome"
                label="Nome (como está no cartão)"
                placeholder="Digite o nome"
                fullWidth
                name="nome_titular"
                value={nomeTitular}
                onChange={e =>setNomeTitular(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <p className="bold mb1">Validade do Cartão</p>
              <TextField
                id="validade"
                label="Validade"
                placeholder="00/00"
                fullWidth
                name="validade"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputComponent: textMaskCredVal,
                }}
              />
            </Grid> */}
            <Grid item xs={6}>
              <p className="bold mb1">Vencimento do pagamento para as parcelas</p>
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
            <Grid item xs={6}>
              <p className="bold mb1">
                Relação do titular da conta com o segurado
              </p>
              <InputLabel shrink id="relacao_titular">
                Selecione uma opção
              </InputLabel>
              <Select
                name="relacao_titular"
                fullWidth
                displayEmpty
                labelId="relacao_titular"
                id="relacao_titular"
                value={relacao}
                onChange={e =>setRelacao(e.target.value)}
                // value={
                //   this.props.values.relacao_titular
                //     ? this.props.values.relacao_titular
                //     : ""
                // }
              >
                <MenuItem value="" disabled>
                  Selecione
                </MenuItem>
                <MenuItem value="PARTNER">Companheiro(a)</MenuItem>
                <MenuItem value="MARRIED">Côjuge</MenuItem>
                <MenuItem value="CHILD">Filho(a)</MenuItem>
                <MenuItem value="FATHER">Pai</MenuItem>
                <MenuItem value="MOTHER">Mãe</MenuItem>
                <MenuItem value="SIBLING">Irmão(a)</MenuItem>
                <MenuItem value="SAME">O próprio segurado</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className="bold mb1">Nome Completo do Titular da Conta</p>
              <TextField
                type="text"
                id="nome_completo"
                label="Nome Completo"
                placeholder="Digite o nome"
                fullWidth
                name="nome_completo"
                value={nomeCompleto}
                onChange={e =>setNomeCompleto(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <p className="bold mb1">CPF Do Titular da Conta</p>
              <TextField
                id="cpf_titular"
                name="cpf_titular"
                label="CPF"
                placeholder="000.000.000-00"
                fullWidth
                value={cpfTitular}
                onChange={e =>setCpfTitular(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputComponent: textMaskCpf,
                  autoComplete: "off",
                }}
              />
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}
export default PayAccountDebit;
