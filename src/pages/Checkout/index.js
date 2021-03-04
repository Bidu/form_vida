import React, { useEffect , useState} from "react";
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
import { ExpansionPanel } from "@material-ui/core";
function Checkout() {
  const [meioPagamento, setMeioPagamento] = useState({})
  const [pay, setPay] = useState("")
  const [payment, setPayment] = useState([])


  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("@bidu2/saude/plan"));
    console.log("DADOS", dados)
    setPayment(dados.quotationResult.paymentPlans)
  },[])
  const handleChange = (event)=>{
    setPay(event.target.value)
  }
  const setMeioDePagamento = (e) =>{
    setMeioPagamento(e)
  }
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
              // value={pay}
              onChange={handleChange}
            >
              <Grid container spacing={2}>
                 {payment && ( 
                  <>
                    {payment.map(
                      (p) =>
                        (p.paymentMode === "CREDITCARD" && (
                          <OptCredit
                            checked={p}
                            valor={p}
                            clickC={(res) => setMeioDePagamento(res)}
                          />
                        )) ||
                        (p.paymentMode === "DEBIT" && (
                          <OptDebit
                            checked={p}
                            valor={p}
                            clickC={(res) => setMeioDePagamento(res)}
                          />
                        )) ||
                        (p.paymentMode === "BILLET" && (
                          <OptBankSlip
                            checked={p}
                            valor={p}
                            clickC={(res) => setMeioDePagamento(res)}
                          />
                        ))
                    )
                    }

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
          meioPagamento &&
          meioPagamento.paymentMode == "CREDITCARD" && (
            <PayCreditCard creditopg={meioPagamento} />
          )}
        {pay === "DEBIT" &&
          meioPagamento &&
          meioPagamento.paymentMode == "DEBIT" && (
            <PayAccountDebit contapg={meioPagamento} />
          )}
        {pay === "BILLET" && 
        meioPagamento &&
        meioPagamento.paymentMode == "BILLET" && (
        <PayBankBill boletopg={meioPagamento}/>
        )}
      </Wrapper>
      {/* <StepCompleted bold="Cotação" />
      <StepCompleted text="Sobre o" bold="veículo" />
      <StepCompleted text="Sobre" bold="você" /> */}
    </>
  )

}

export default Checkout;
