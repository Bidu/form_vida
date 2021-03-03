import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Wrapper from "../../components/wrapper";
import Title from "../../components/Title";
import { Steps } from "../../components/steps";
import { ProductCard } from "../../components/ProductCard";
import PayCreditCard from "../../components/payment/CreditCard";
import PayAccountDebit from "../../components/payment/AccountDebit";
import PayBankBill from "../../components/payment/BankBill";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { StepCompleted } from "../../components/StepCompleted";
import { GTM } from "../../helpers";
import OptDebit from "../../components/payment/OptDebit";
import OptCredit from "../../components/payment/OptCredit";
import OptBankSlip from "../../components/payment/OptBankSlip";
import { createBrowserHistory } from "history";
export class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: "",
      options: [],
      installments: "",
      lightbox_details: false,
    };
  }

  componentDidMount() {
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Pgto"),
    // });
    /*End Google Tag Manager*/
    // var history = createBrowserHistory();
    // window.ga('set', 'page', history.location.pathname + history.location.search);
    // window.ga('send', 'pageview');
    const dados = JSON.parse(localStorage.getItem("@bidu2/saude/plan"));

    this.setState({
      ...this.state,
      payment: dados.quotationResult.paymentPlans,
      susep: dados.susep,
      pay: dados.planosPagamento,
    });
  }
  setMeioDePagamento = async (e) => {
    console.log("PAGAMENTO", e);

    await this.setState({ meioPagamento: e });
  };
  handleChange = (event) => {
    this.setState({ ...this.state, pay: event.target.value });

    console.log(event.target.value);
    //console.log(event.target.value);

    // /*Google Tag Manager*/
    // if (event.target.value === "CREDITCARD") {
    //   window.dataLayer.push({ event: GTM("Pgto_Cartao") });
    // } else if (event.target.value === "DEBIT") {
    //   window.dataLayer.push({ event: GTM("Pgto_Debito") });
    // } else {
    //   window.dataLayer.push({ event: GTM("Pgto_Boleto") });
    // }
    // /*End Google Tag Manager*/
  };
  render() {
    const { payment, pay, susep } = this.state;

    return (
      <>
        <Wrapper>
          {/* <Steps step1={true} step2={true} step3={true} /> */}
          {/* <div className="checkout">
            <Title bold="Pagamento"></Title>
          </div> */}
          {/* <ProductCard /> */}
          <div className="mt1e5">
            <p className="bold">Opção de pagamento</p>
            <FormControl component="fieldset" className="">
              <RadioGroup
                aria-label="filtro"
                name="filter"
                value={this.state.pay}
                onChange={this.handleChange}
              >
                <Grid container spacing={2}>
                  {payment instanceof Array && (
                    <>
                      {payment.map(
                        (p) =>
                          (p.paymentMode === "CREDITCARD" && (
                            <OptCredit
                              checked={p}
                              valor={p}
                              clickC={(res) => this.setMeioDePagamento(res)}
                            />
                          )) ||
                          (p.paymentMode === "DEBIT" && (
                            <OptDebit
                              checked={p}
                              valor={p}
                              clickC={(res) => this.setMeioDePagamento(res)}
                            />
                          )) ||
                          (p.paymentMode === "BILLET" && (
                            <OptBankSlip
                              checked={p}
                              valor={p}
                              clickC={(res) => this.setMeioDePagamento(res)}
                            />
                          ))
                      )}
                    </>
                  )}
                  {pay === "CREDITCARD" && typeof payment === "string" && (
                    <OptCredit checked={pay} />
                  )}
                  {pay === "DEBIT" && typeof payment === "string" && (
                    <OptDebit checked={pay} />
                  )}
                  {pay === "BILLET" && typeof payment === "string" && (
                    <OptBankSlip checked={pay} />
                  )}
                </Grid>
              </RadioGroup>
            </FormControl>
          </div>

          {pay === "CREDITCARD" &&
            this.state.meioPagamento &&
            this.state.meioPagamento.paymentMode == "CREDITCARD" && (
              <PayCreditCard creditopg={this.state.meioPagamento} />
            )}
          {pay === "DEBIT" &&
            this.state.meioPagamento &&
            this.state.meioPagamento.paymentMode == "DEBIT" && (
              <PayAccountDebit contapg={this.state.meioPagamento} />
            )}
          {pay === "BILLET" && 
          this.state.meioPagamento &&
          this.state.meioPagamento.paymentMode == "BILLET" && (
          <PayBankBill boletopg={this.state.meioPagamento}/>
          )}
        </Wrapper>
        {/* <StepCompleted bold="Cotação" />
        <StepCompleted text="Sobre o" bold="veículo" />
        <StepCompleted text="Sobre" bold="você" /> */}
      </>
    );
  }
}
export default Checkout;
