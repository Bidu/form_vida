import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { ConvertCurrency, GTM } from "../helpers";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Title from "./Title";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Dictionary from "../helpers/Dictionary/Quote";

export class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightbox_details: false,
      dados_cotacao: JSON.parse(localStorage.getItem("@bidu2/dados_cotacao")),
    };
    this.escExitLightbox = this.escExitLightbox.bind(this);
  }
  BtnLightboxDetailsClose = () => {
    this.setState({ lightbox_details: false });
    this.lightboxBehaviorClose();
  };
  BtnLightboxDetailsOutClose = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.setState({ lightbox_details: false });
      this.lightboxBehaviorClose();
    }
  };
  BtnLightboxDetailsOpen = (e) => {
    e.preventDefault();
    this.setState({ lightbox_details: true });
    this.lightboxBehaviorOpen();
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Pgto_VerDetalhes"),
    // });
    /*End Google Tag Manager*/
  };

  lightboxBehaviorClose() {
    let shadesEl = document.querySelector("body");
    shadesEl.classList.remove("active-lightbox");
  }
  lightboxBehaviorOpen() {
    let shadesEl = document.querySelector("body");
    shadesEl.classList.add("active-lightbox");
  }

  escExitLightbox(event) {
    if (event.keyCode === 27) {
      this.lightboxBehaviorClose();
      this.setState({
        lightbox_details: false,
      });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escExitLightbox, false);
    const dados = JSON.parse(localStorage.getItem("@bidu2/dados_cotacao"));
    delete dados.precoParcelamento;
    localStorage.setItem("@bidu2/dados_cotacao", [JSON.stringify(dados)]);

    setInterval(() => {
      this.setState({
        dados_cotacao: JSON.parse(localStorage.getItem("@bidu2/dados_cotacao")),
      });
    }, 1000);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escExitLightbox, false);
  }

  render() {
    const { lightbox_details, dados_cotacao } = this.state;

    return (
      <>
        <div className="txt-center product-card">
          <div className="product">
            <div className="content">
              <div className="logo-container">
                <figure className="logo-hdmi logo-cotacao">
                  <img
                    alt="hdmi"
                    src={`${require(`../assets/img/${dados_cotacao.susep}.svg`)}`}
                  />
                </figure>
              </div>
              <div className="infos">
                <div className="price">
                  {ConvertCurrency(
                    dados_cotacao.precoParcelamento
                      ? dados_cotacao.precoParcelamento
                      : dados_cotacao.preco
                  )}
                  <Box mx={0.2} display="inline" />
                  {dados_cotacao.susep === 5908 && (
                    <span style={{ fontSize: "15px" }}>
                      + R$ {dados_cotacao.valorKm.toFixed(2).replace(".", ",")}{" "}
                      por Km rodado
                    </span>
                  )}
                </div>

                <div className="description">
                  <span className="bold">Seguro Completo</span>
                  <p>
                    {dados_cotacao.coberturas.map((c) => `${c.descricao}, `)}
                  </p>
                </div>
              </div>
            </div>

            <div className="links">
              <Grid item spacing={0} className="table-header" container>
                <Grid item xs={6}>
                  <Link
                    className="back"
                    href="#"
                    title="Escolher outro"
                    to={`/cotacao/${localStorage.getItem("@bidu2/idcotacao")}`}
                  >
                    <KeyboardBackspaceIcon /> <span>Escolher outro</span>
                  </Link>
                </Grid>
                <Grid item xs={6} className="txt-right">
                  <a
                    className="more"
                    href="#"
                    title="Mais detalhes"
                    onClick={(e) => this.BtnLightboxDetailsOpen(e)}
                  >
                    <span>+ detalhes</span>
                  </a>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>

        {lightbox_details && (
          <div
            className="custom lightbox"
            onClick={this.BtnLightboxDetailsOutClose}
          >
            <div className="content">
              <div className="header-title">
                <Title bold="Ver detalhes"></Title>
                <div
                  onClick={this.BtnLightboxDetailsClose}
                  className="btn-close"
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="entry">
                <p className="subtitle bold">
                  Detalhes e assistências do seguro{" "}
                  {Dictionary.company[dados_cotacao.susep]}
                </p>
                {dados_cotacao.valorKm && (
                  <p>
                    <span className="bold">Valor do KM Rodado</span>
                    <br />

                    <>
                      <span>{`R$ ${dados_cotacao.valorKm
                        .toFixed(2)
                        .replace(".", ",")}`}</span>
                      <br />
                    </>
                  </p>
                )}
                <p>
                  <span className="bold">Coberturas</span>
                </p>

                {dados_cotacao.coberturas
                  .filter((v) => v.valor !== 0)
                  .map((q, index) => (
                    <p key={index}>
                      <span className="bold">{q.descricao}</span>
                      <br />
                      {ConvertCurrency(q.valor)}
                    </p>
                  ))}

                {dados_cotacao.fipe && (
                  <p>
                    <span className="bold">Cobertura da FIPE</span>
                    <br />
                    <span>{dados_cotacao.fipe}%</span>
                  </p>
                )}

                {dados_cotacao.servicos.length > 0 && (
                  <p>
                    <span className="bold">Serviços e Assistências</span>
                    <br />
                    {dados_cotacao.servicos.map((q, index) => (
                      <>
                        <span key={index}>{q.descricao}</span>
                        <br />
                      </>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
