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
import { card } from "../../helpers/card"

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



  componentDidMount() {
    
    this.setState({
      loading: true,
    });

    // this.getCotacoes()
    console.log(card[0].planos[0].abrangencia)
    this.setState({
      loading: false,
    });
    }
   




  getCotacoes = async (sortBy = null) => {
    this.setState({
      loading: true
    });
    const idUrl = this.props.match.params.id;
    if (idUrl || localStorage.getItem("@bidu2/cotacao")) {
      localStorage.setItem("@bidu2/idcotacao", idUrl);
      localStorage.removeItem("@bidu2/cotacao");
      
      let obterIdCotacao = await apiQualicorp.pesquisarCotacao(localStorage.getItem("@bidu2/idcotacao"));
      localStorage.setItem("@bidu2/cotacao", JSON.stringify(obterIdCotacao[0]))
    }
    if (JSON.parse(localStorage.getItem("@bidu2/user")).cpf &&
    JSON.parse(localStorage.getItem("@bidu2/user")).cpf.replace(/[.-]/g,"") != 
    JSON.parse(localStorage.getItem("@bidu2/cotacao")).segurado.documento.replace(/[.-]/g,"")){
      const obj = [];
      localStorage.setItem("@bidu2/user", JSON.stringify(obj))
      localStorage.setItem("@bidu2/condutor", JSON.stringify(obj))
      localStorage.setItem("@bidu2/dados_cotacao", JSON.stringify(obj))
      localStorage.setItem("@bidu2/veiculo", JSON.stringify(obj))
      localStorage.setItem("@bidu2/seu-veiculo", JSON.stringify(obj))
      localStorage.setItem("@bidu2/utilizacao", JSON.stringify(obj))
      localStorage.setItem("@bidu2/passa_noite", JSON.stringify(obj))
      localStorage.setItem("@bidu2/seguro", JSON.stringify(obj))
    }
    const idcotacao = idUrl ? idUrl : localStorage.getItem("@bidu2/idcotacao");
  
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
                    onChange={(e) => { this.getCotacoes(e.target.value) }}
                  />
                  <FormControlLabel value="1" control={<Radio color="primary" />}
                    label="Menor valor"
                    onChange={(e) => { this.getCotacoes(e.target.value) }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {!this.state.cotacoes.length && !this.state.loading && (
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

              {cotacoes.map((c, index) => (
                <>

                  {
                    c.susep !== 5908 ? (
                      <ListPriceQuotation key={index} quote={c} getQuote={this.getCustomQuote} />

                    ) : (
                        <ListPriceQuotationPPU key={index} quote={JSON.stringify(cotacoes[index])} getQuote={this.getCustomQuote} />
                      )
                  }

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