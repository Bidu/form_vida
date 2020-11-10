import React, { Component } from "react";
import Wrapper from "../../components/wrapper";
import Title from "../../components/Title";
import { Steps } from "../../components/steps";
import { ListPriceQuotation } from "../../components/ListPriceQuotation";
import { ListPriceQuotationCustom } from "../../components/ListPriceQuotationCustom";
import { ListPriceQuotationPPU } from "../../components/ListPriceQuotationPPU";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { StepCompleted } from "../../components/StepCompleted";
import CachedIcon from "@material-ui/icons/Cached";
import IconButton from "@material-ui/core/IconButton";
import { GTM } from "../../helpers";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading";
import { apiQualicorp } from "../../services/bdBo";


import { createBrowserHistory } from 'history';

export class PriceQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightbox: false,
      loading: false,
      cotacoes: [],
      customQuote: [],
      customQuoteCheck: false,
    };
    this.getCustomQuote = this.getCustomQuote.bind(this);

  }

  getCustomQuote = (customQuote) => {
    this.setState({
      ...this.state,  
      customQuoteCheck: true,
      customQuote,
    });
  };

  getCotacoes = async () => {


    let user = JSON.parse(localStorage.getItem("@bidu2/user"))
    let entidade = await apiQualicorp.consultarEntidade(user.profissao, user.uf, user.cidade)
    console.log("Entidade", entidade)
    if(entidade.length > 0)
    {
      let getPlan = {
        "entidade": entidade[1].NomeFantasia,
        "uf": user.uf,
        "cidade": user.cidade ,
        "datanascimento": [`${user.nasc_ano}-${user.nasc_mes}-${user.nasc_dia}` ]
      }
     
     let plans =  await apiQualicorp.listarPlanos(getPlan)
     if(plans[0].planos.length > 0)
     {
       this.setState({cotacoes: plans})
     }
  
    }
    

  }


  sortBy = (order) =>{
    this.setState({
      loading: true
    });

    let cotacoes = this.state.cotacoes
   console.log(cotacoes)


    let planosOrder = []

    cotacoes[0].planos.map((item) => {
      planosOrder.push(item)
    })


    switch (order) {

      case "0":
        planosOrder = planosOrder.sort((a, b) => {
          return b.precos.total - a.precos.total
        })
        break;
      case "1":
        planosOrder = planosOrder.sort((a, b) => {
          return a.precos.total - b.precos.total
        })
        break;
      default:
        break;
      }

 
    cotacoes[0].planos = planosOrder

    this.setState({cotacoes})

    this.setState({
      loading: false
    });
  }

  async componentDidMount() {
    
    this.setState({
      loading: true,
    });

    await this.getCotacoes()

    this.setState({
      loading: false,
    });
    }
   


  OpenChat = (e) => {
    e.preventDefault();
    window.initiateCall(1);

  };

  ReloadCotacoes = () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 30000);
  };
  
  render() {
    //this.Ordenacao();
    const { loading, cotacoes, customQuote, customQuoteCheck } = this.state;
    return (
      <>
        <Wrapper>
      
          <div className="price-quote">
            <Steps step1={true} step2={true} step3={true} />
            {/* <Title bold="Cotação" idquote={localStorage.getItem("@bidu2/idcotacao")} /> */}
            {<Title bold="Cotação" />} 
          </div>
          <div className="filter">
            <div>
              <FormControl component="fieldset" className="price-quote">
                <RadioGroup aria-label="filtro" name="filter" value={this.state.value} onChange={this.handleChange} row>
                  <FormControlLabel value="0" control={<Radio color="primary" />}
                    label="Maior valor"
                    onChange={(e) => { this.sortBy(e.target.value) }}
                  />
                  <FormControlLabel value="1" control={<Radio color="primary" />}
                    label="Menor valor"
                    onChange={(e) => { this.sortBy(e.target.value) }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {cotacoes.length == 0 && !this.state.loading && (
            <div className="loading-cotacoes">
              <IconButton onClick={this.ReloadCotacoes}>
                <CachedIcon style={{ fontSize: 60, color: "#000000" }} />
                <span>
                  Não retornou nenhuma cotação? <br />
          Atualize a página.
        </span>
              </IconButton>
            </div>
          )}

          <div className="quotations">
            <Grid container spacing={2}>
              {customQuoteCheck ? (
                <ListPriceQuotationCustom quote={JSON.stringify([customQuote])} />
              ) : (
                  ""
                )}

              {loading &&
                <Loading />}

              {/*cotacoes.map((c, index) => (
        <div>{this.getValores(JSON.stringify(cotacoes[index]))}</div>
        ))*/}
            
               {cotacoes.length > 0 && cotacoes[0].planos.map((c, index) => (
                 <>
                     <ListPriceQuotation key={index} quote={c} getQuote={this.getCustomQuote} />
                 </>
               ))} 
               
            </Grid>
          </div>
          <div className="more-options">
            <p>
              Não encontrou a seguradora que procurava? <br />
              <a href="#" title="" className="primary" onClick={this.OpenChat}>
                Clique aqui e veja mais opções
        </a>
            </p>
          </div>
          <div className="actions mt0">
            <Link className="btn-back" to="/sobrevoce">
              <KeyboardBackspaceIcon /> Voltar
      </Link>
          </div>
        </Wrapper>
      </>
    );
  }
}