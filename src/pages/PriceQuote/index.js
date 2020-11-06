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

    // if(localStorage.getItem("@bidu2/user") == null || JSON.parse(localStorage.getItem("@bidu2/user")).length == 0)
    // window.location.href="/sobrevoce"   
  }

  getCustomQuote = (customQuote) => {
    this.setState({
      ...this.state,  
      customQuoteCheck: true,
      customQuote,
    });
  };

  /*getValores = v => {
  const valores = JSON.parse(v);
  const filtros = [];
  valores.resultadoCotacao.planosPagamento.map((v, index) =>
  filtros.push(v.planoParcela[9].valorParcela)
  );
  console.log(filtros);
  setTimeout(() => {
  this.setState({
  ...this.state,
  valores: filtros
  });
  }, 3000);
  };*/

  componentDidMount() {
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao"),
    // });
    /*End Google Tag Manager*/
    // var history = createBrowserHistory();
    // window.ga('set', 'page', history.location.pathname + history.location.search);
    // window.ga('send', 'pageview');
    this.setState({
      loading: true,
    });

    this.getCotacoes()

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
    const AuthStr = "Bearer ".concat(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1ODk5OTQ2MDQsImV4cCI6MTYyMTUzMDYwNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.iiMMWhNwVSqKz4FuraSGxlRL2l5hPGaUGWvXfFsRuUc"
    );
    //const URL = `https://api-auto-dot-bidu-digital-prod.rj.r.appspot.com/cotacao/${idcotacao}`;
    const URL = `https://api-auto-dot-bidu-digital-dev.appspot.com/cotacao/${idcotacao}`;
    axios
      .get(URL, { headers: { Authorization: AuthStr } })
      .then((res) => {
        const cotacoes = res.data;
        let cotValid = []
        let cotSortBy = []

        switch (sortBy) {

          case "0":
            /**
             * Ordena quando o radio button é ativado
             * MAIOR valor
             */


            cotSortBy = []
            cotacoes.body.map((item) => {
              if (item.statusComunicacao === "SUCESSO") {
                cotSortBy.push(item)
              }
            })

            cotValid = cotSortBy.sort((a, b) => {
              return b.resultadoCotacao.premioTotal - a.resultadoCotacao.premioTotal
            })

            cotacoes.body.map((item) => {
              if (item.statusComunicacao !== "SUCESSO") {
                cotValid.push(item)
              }
            })




            break;
          case "1":
            /**
             * Ordena quando o radio button é ativado
            * MENOR  valor
            */
            this.setState({
              loading: true
            });

            cotSortBy = []
            cotacoes.body.map((item) => {
              if (item.statusComunicacao === "SUCESSO") {
                cotSortBy.push(item)
              }
            })

            cotValid = cotSortBy.sort((a, b) => {
              return a.resultadoCotacao.premioTotal - b.resultadoCotacao.premioTotal
            })

            cotacoes.body.map((item) => {
              if (item.statusComunicacao !== "SUCESSO") {
                cotValid.push(item)
              }
            })

            break;
          default:
            /**
             * O codigo abaixo ordena e apresenta o que teve retorno com o STATUS SUCESSO primeiro que o teve FALHA
             */
            cotacoes.body.map((item) => {
              if (item.statusComunicacao === "SUCESSO") {
                cotValid.push(item)
              }
            })
            cotacoes.body.map((item) => {
              if (item.statusComunicacao !== "SUCESSO") {
                cotValid.push(item)
              }
            })

            console.log(cotValid)

            break;
        }


        this.setState({
          cotacoes: cotValid,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        // console.log(error);
      });
  }

  OpenChat = (e) => {
    e.preventDefault();
    window.initiateCall(1);
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao_VerMaisOpcoes"),
    // });
    /*End Google Tag Manager*/
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



  Ordenacao = () => {
    /*const fields = this.state.cotacoes.resultadoCotacao.planosPagamento.planoParcela
    .filter((id) => id.quantidadeParcelas === 10)
    .map((v) => v.valorParcela)[0]
    .sort(function (a, b) {
    return parseInt(a.valorParcela) - parseInt(b.valorParcela);
    });
    console.log(fields);
    const valor = this.state.cotacoes.map((c) =>
    c.resultadoCotacao.planosPagamento.planoParcela
    );
    return console.log(valor);*/
    /*const valor = this.state.cotacoes.map(
    (c) => c.resultadoCotacao.planosPagamento.planoParcela
    );*/
    /*const valor = this.state.cotacoes.map(
    (c) =>
    c.resultadoCotacao.planosPagamento.planoParcela &&
    c.resultadoCotacao.planosPagamento.planoParcela.filter(
    (v) => v.valorParcela >= 800
    )
    );
    console.log(valor, null, 2);
    
    */
    /*const valor = [
    this.state.cotacoes.map(
    (c) =>
    c.resultadoCotacao.planosPagamento.planoParcela &&
    c.resultadoCotacao.planosPagamento.planoParcela.map(
    (v) => v.valorParcela
    )
    ),
    ];
    
    console.log(valor);
    
    const data = [
    [
    { a: "b", value: 12 },
    { a: "bb", value: 39 },
    { a: "bb", value: 150 },
    ],
    [
    { a: "c", value: 15 },
    { a: "cc", value: 83 },
    { a: "ccc", value: 12 },
    ],
    [
    { a: "d", value: 55 },
    { a: "dd", value: 9 },
    { a: "dd", value: 1 },
    ],
    ],
    result = data.map((a) => Math.max(...a.map((b) => b.value)));
    console.log(result);
    */
    /*const teste = [
    [
    1510.06,
    755.03,
    503.35,
    377.51,
    302.01,
    251.67,
    215.72,
    188.75,
    167.78,
    151,
    ],
    [
    1391.16,
    695.58,
    463.72,
    347.79,
    278.23,
    231.86,
    198.74,
    173.9,
    154.57,
    139.12,
    ],
    [
    1705.23,
    852.61,
    568.41,
    450.44,
    368.31,
    316.37,
    276.92,
    251.27,
    228.49,
    210.32,
    195.51,
    183.23,
    ],
    [
    1516.67,
    758.27,
    505.5,
    379.08,
    303.27,
    252.7,
    226.35,
    199.55,
    182.11,
    165.39,
    155.45,
    144.13,
    ],
    ];
    
    const result = teste.map((a) => Math.max(...a.map((b) => b)));
    console.log(result);*/
  };
  render() {
    //this.Ordenacao();
    const { loading, cotacoes, customQuote, customQuoteCheck } = this.state;
    return (
      <>
        <Wrapper>
          {/*this.state.cotacoes.map((c) => (
    <div className="card">
      <div className="card-body">
        {c.resultadoCotacao.planosPagamento.planoParcela &&
        c.resultadoCotacao.planosPagamento.planoParcela.map(
        (v, j) => <p key={j}>{v.valorParcela}</p>
        )}
      </div>
    </div>
    ))*/}
          <div className="price-quote">
            <Steps step1={true} step2={true} step3={true} />
            <Title bold="Cotação" idquote={localStorage.getItem("@bidu2/idcotacao")} />
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
            <Link className="btn-back" to="/veiculo/condutor">
              <KeyboardBackspaceIcon /> Voltar
      </Link>
          </div>
        </Wrapper>
        <StepCompleted text="Sobre o" bold="veículo" />
        <StepCompleted text="Sobre" bold="você" />
      </>
    );
  }
}