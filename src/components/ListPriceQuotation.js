import React, { Component } from "react";
import { ConvertCurrency, GTM } from "../helpers";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link, Redirect } from "react-router-dom";
import Title from "./Title";
import CloseIcon from "@material-ui/icons/Close";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Dictionary from "../helpers/Dictionary/Quote";
import ErrorQuote from "./ErrorQuote";
import ListPriceQuotationServices from "./ListPriceQuotationServices";

const marks_fipe = {
  85: {
    style: {
      left: "6px",
    },
    label: "85%",
  },
  95: "95%",
  110: {
    style: {
      left: "auto",
      right: "-19px",
    },
    label: "110%",
  },
};
const marks_guincho = {
  200: {
    style: {
      left: "12px",
    },
    label: "200km",
  },
  400: "400km",
  600: {
    style: {
      left: "auto",
      right: "-28px",
    },
    label: "ilimitado",
  },
};
const marks_carro_reserva = {
  1: "7",
  2: "15",
  3: "30",
  4: "45",
};
const marks_vidros = {
  1: {
    style: {
      left: "32px",
    },
    label: "sem cobertura",
  },
  2: "básica*",
  3: {
    style: {
      left: "auto",
      right: "-30px",
    },
    label: "completa*",
  },
};
const marks_franquia = {
  1: {
    style: {
      left: "17px",
    },
    label: "reduzida",
  },
  2: "básica*",
  3: {
    style: {
      left: "auto",
      right: "-29px",
    },
    label: "ampliada",
  },
};
const marks_coberturas = {
  1: {
    style: {
      left: "39px",
    },
    label: "incêndio e roubo",
  },
  2: {
    style: {
      right: "-70px",
      left: "auto",
    },
    label: "incêndio e roubo + colisão",
  },
};
const marks_danos_materiais = {
  10: {
    style: {
      left: "8px",
    },
    label: "10mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
const marks_danos_corporais = {
  10: {
    style: {
      left: "8px",
    },
    label: "10mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
const marks_danos_morais = {
  5: {
    style: {
      left: "6px",
    },
    label: "5mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
const marks_morte_acidente = {
  5: {
    style: {
      left: "6px",
    },
    label: "5mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
const marks_invalidez_acidente = {
  5: {
    style: {
      left: "6px",
    },
    label: "5mil",
  },
  50: {
    style: {
      right: "-18px",
      left: "auto",
    },
    label: "50mil",
  },
};
function log(value) {
  // console.log(value);
}

export class ListPriceQuotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      lightbox_custom: false,
      lightbox_details: false,
      lightbox_agree: false,
      fipe: 85,
      guincho: 200,
      ar_condicionado: false,
      roubo_furto: 1,
      vidros: 1,
      colisao: 1,
      coberturas: 1,
      danos_materiais_check: false,
      danos_materiais: 10,
      danos_corporais_check: false,
      danos_corporais: 10,
      danos_morais_check: false,
      danos_morais: 5,
      morte_acidente_check: false,
      morte_acidente: 5,
      invalidez_acidente_check: false,
      invalidez_acidente: 5,
      redirect: false,
      cotacao: this.props.quote,
      loading: false,
      customQuote: this.props.quote,
    };
    this.escExitLightbox = this.escExitLightbox.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escExitLightbox, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escExitLightbox, false);
  }
  componentDidUpdate() {
    //  this.setState({ cotacao: this.props.quote })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onFipeChange = (value) => {
    log(value);
    this.setState({
      fipe: value,
    });
  };
  onGuinchoChange = (value) => {
    log(value);
    this.setState({
      guincho: value,
    });
  };
  onRouboFurtoChange = (value) => {
    log(value);
    this.setState({
      roubo_furto: value,
    });
  };
  onVidrosChange = (value) => {
    log(value);
    this.setState({
      vidros: value,
    });
  };
  onColisaoChange = (value) => {
    log(value);
    this.setState({
      colisao: value,
    });
  };
  onCoberturasChange = (value) => {
    log(value);
    this.setState({
      coberturas: value,
    });
  };
  onDanosMateriaisChange = (value) => {
    log(value);
    this.setState({
      danos_materiais: value,
    });
  };
  onDanosCorporaisChange = (value) => {
    log(value);
    this.setState({
      danos_corporais: value,
    });
  };
  onDanosMoraisChange = (value) => {
    log(value);
    this.setState({
      danos_morais: value,
    });
  };
  onMorteAcidenteChange = (value) => {
    log(value);
    this.setState({
      morte_acidente: value,
    });
  };
  onInvalidezAcidenteChange = (value) => {
    log(value);
    this.setState({
      invalidez_acidente: value,
    });
  };

  handleChangeSwitch = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.checked,
    });
  };
  BtnCustomClose = () => {
    this.setState({ lightbox_custom: false });
    this.lightboxBehaviorClose();
  };
  BtnCustomOutClose = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.setState({ lightbox_custom: false });
      this.lightboxBehaviorClose();
    }
  };
  BtnCustomboxOpen = (e) => {
    e.preventDefault();
    this.setState({ lightbox_custom: true });
    this.lightboxBehaviorOpen();
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao_Customizar"),
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

  BtnLightboxDetailsClose = (e) => {
    e.preventDefault();
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
  BtnLightboxDetailsOpen = () => {
    this.setState({ lightbox_details: true });
    this.lightboxBehaviorOpen();
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao_VerDetalhes"),
    // });
    /*End Google Tag Manager*/
  };
  BtnLightboxAgreeClose = (e) => {
    e.preventDefault();
    this.setState({ lightbox_agree: false });
    this.lightboxBehaviorClose();
  };
  BtnLightboxAgreeOutClose = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.setState({ lightbox_agree: false });
      this.lightboxBehaviorClose();
    }
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao_MsgImportantes_NConcordo"),
    // });
    /*End Google Tag Manager*/
  };
  BtnLightboxAgreeOpen = (e) => {
    this.setState({ lightbox_agree: true });
    this.lightboxBehaviorOpen();
  };
  BtnRedirectCheckout = () => {
    localStorage.removeItem("@bidu2/transmissao");
    localStorage.removeItem("@bidu2/dados_cotacao");
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Cotacao_MsgImportantes_Concordo"),
    // });
    /*End Google Tag Manager*/

    this.lightboxBehaviorClose();
    this.setState({
      ...this.state,
      redirect: true,
      dados_cotacao: {
        susep: this.state.cotacao.susep,
      },
    });

    const propriedadeSeguradora = this.state.cotacao.resultadoCotacao
      .propriedadeSeguradora;

    localStorage.setItem(
      "@bidu2/dados_cotacao",
      JSON.stringify({
        susep: this.state.cotacao.susep,
        preco: this.state.cotacao.resultadoCotacao.premioTotal,
        parcelas:
          this.state.cotacao.resultadoCotacao.planosPagamento.length >= 1
            ? this.getMaxValue(
                this.state.cotacao.resultadoCotacao.planosPagamento.map((p) =>
                  p.planoParcela.map((v) => v.quantidadeParcelas)
                )
              )
            : this.state.cotacao.resultadoCotacao.planosPagamento.planoParcela
                .length,
        dadosParcelas:
          this.state.cotacao.resultadoCotacao.planosPagamento.length >= 1
            ? this.state.cotacao.resultadoCotacao.planosPagamento
            : this.state.cotacao.resultadoCotacao.planosPagamento.planoParcela,
        idProtocolo: this.state.cotacao.resultadoCotacao.idProtocolo,
        coberturas: this.state.cotacao.resultadoCotacao.coberturas,
        servicos: this.state.cotacao.resultadoCotacao.servicos,
        fipe: this.state.cotacao.resultadoCotacao.coberturaFipe,
        bancos:
          this.state.cotacao.resultadoCotacao.planosPagamento.length >= 1
            ? this.state.cotacao.resultadoCotacao.planosPagamento
                .filter((b) => b.modoPagamento === "DEBIT")
                .map((p) => p.provedorPagemento)
            : this.state.cotacao.resultadoCotacao.planosPagamento
                .provedorPagemento,
        /* bancos: this.state.cotacao.resultadoCotacao.planosPagamento
          .filter((b) => b.modoPagamento === "DEBIT")
          .map((p) => p.provedorPagemento), */
        /* planosPagamento: this.state.cotacao.resultadoCotacao.planosPagamento
          .modoPagamento, */
        planosPagamento:
          this.state.cotacao.resultadoCotacao.planosPagamento.length >= 1
            ? this.state.cotacao.resultadoCotacao.planosPagamento.map(
                (opt) => opt.modoPagamento
              )
            : this.state.cotacao.resultadoCotacao.planosPagamento.modoPagamento,
        "x-track-id": this.state.cotacao.resultadoCotacao["x-track-id"],
        uuidHdi: this.state.cotacao.resultadoCotacao.uuidHdi,
        propriedadeSeguradora,
      })
    );
  };

  escExitLightbox(event) {
    if (event.keyCode === 27) {
      this.lightboxBehaviorClose();
      this.setState({
        lightbox_custom: false,
        lightbox_details: false,
        lightbox_agree: false,
      });
    }
  }

  getMinValue(arr) {
    let minRow = arr.map(function (row) {
      return Math.min.apply(Math, row);
    });
    let min = Math.min.apply(null, minRow);
    return min;
  }

  getMaxValue(arr) {
    let maxRow = arr.map(function (row) {
      return Math.max.apply(Math, row);
    });
    let max = Math.max.apply(null, maxRow);
    return max;
  }

  getCustomQuote = (state) => {
    this.setState({
      ...this.state,
      lightbox_custom: false,
      customQuote: [this.state],
    });
    this.props.getQuote(this.state.customQuote);
    this.lightboxBehaviorClose();
  };

  render() {
    let { cotacao, customQuote } = this.state;
    cotacao = this.props.quote;

    const {
      lightbox_custom,
      lightbox_details,
      lightbox_agree,
      fipe,
      guincho,
      ar_condicionado,
      ar,
      vidros,
      franquia,
      coberturas,
      danos_materiais_check,
      danos_materiais,
      danos_corporais_check,
      danos_corporais,
      danos_morais_check,
      danos_morais,
      morte_acidente_check,
      morte_acidente,
      invalidez_acidente_check,
      invalidez_acidente,
      redirect,
    } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: `/checkout/${localStorage.getItem("@bidu2/idcotacao")}`,
            state: {
              parcelas: cotacao.resultadoCotacao.planosPagamento.planoParcela,
            },
          }}
        />
      );
    }
    if (!cotacao) {
      return <div>Carregando</div>;
    } else {
      return (
        <>
          {cotacao.statusComunicacao === "SUCESSO"
            ? cotacao.resultadoCotacao.tipoPlanoCobertura !== "COMPREENSIVA_DETERMINADA" &&
                cotacao.resultadoCotacao.tipoPlanoCobertura !== "COL_INC_ROUBOS E FURTOS" &&
                cotacao.resultadoCotacao.tipoPlanoCobertura !== "INCENDIOS_ROUBOS_FURTOS" &&
                cotacao.resultadoCotacao.tipoPlanoCobertura !== "SEGURO DE TERCEIROS" && (
                <Grid key={cotacao.susep} item xs={12} sm={6}>
                  <div className="list-price-quotation">
                    <div className="logo-container">
                      <figure className="seguradoras">
                        <img
                          alt="hdmi"
                          src={`${require(`../assets/img/${cotacao.susep}.svg`)}`}
                        />
                      </figure>
                    </div>

                    <div class="warning-quote">
                      {
                        Dictionary.quote[
                          cotacao.resultadoCotacao.tipoPlanoCobertura
                        ]
                      }
                    </div>
                    <Grid item spacing={0} className="table-header" container>
                      <Grid item xs={6}>
                        <>
                          <span className="top-label">Valor total</span>
                          <span className="valor-total">
                            {ConvertCurrency(
                              cotacao.resultadoCotacao.premioTotal
                            )}
                          </span>
                        </>
                      </Grid>
                      <Grid item xs={6} className="txt-right">
                        {
                          <span className="top-label">
                            {cotacao.resultadoCotacao.planosPagamento.length >=
                            1
                              ? this.getMaxValue(
                                  cotacao.resultadoCotacao.planosPagamento.map(
                                    (p) =>
                                      p.planoParcela.map(
                                        (v) => v.quantidadeParcelas
                                      )
                                  )
                                )
                              : Math.max(
                                  ...cotacao.resultadoCotacao.planosPagamento.planoParcela.map(
                                    (v) => v.quantidadeParcelas
                                  )
                                )}
                            x
                          </span>
                        }

                        {
                          <span className="valor-parcela">
                            {cotacao.resultadoCotacao.planosPagamento.length >=
                            1
                              ? ConvertCurrency(
                                  this.getMinValue(
                                    cotacao.resultadoCotacao.planosPagamento.map(
                                      (p) =>
                                        p.planoParcela.map(
                                          (v) => v.valorParcela
                                        )
                                    )
                                  )
                                )
                              : ConvertCurrency(
                                  Math.min(
                                    ...cotacao.resultadoCotacao.planosPagamento.planoParcela.map(
                                      (v) => v.valorParcela
                                    )
                                  )
                                )}
                          </span>
                        }
                      </Grid>
                    </Grid>

                    <ListPriceQuotationServices cotacao={cotacao} />
                    <Grid item spacing={0} className="table-footer" container>
                      <Grid item xs={3}>
                        {/*<a
                    href="#"
                    className="bottom-links"
                    onClick={(e) => this.BtnCustomboxOpen(e)}
                  >
                    Customizar
                  </a>*/}
                        <Grid className="txt-left bottom-idProtocolo">
                          <p >
                            {cotacao.resultadoCotacao.idProtocolo}
                          </p>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        xs={6}
                        className="txt-center relative itens-center px05"
                      >
                        <div
                          className="btn-comprar"
                          onClick={(e) =>
                            cotacao.resultadoCotacao.mensagens.length
                              ? this.BtnLightboxAgreeOpen(cotacao.id)
                              : this.BtnRedirectCheckout(cotacao.uuidPpu)
                          }
                          
                        >
                          Comprar
                        </div>
                      </Grid>

                      <Grid item xs={3} className="txt-right">
                        <a
                          href="#"
                          title="Ver detalhes"
                          onClick={(e) => this.BtnLightboxDetailsOpen(e)}
                          className="bottom-links"
                        >
                          Ver detalhes
                        </a>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              )
            : cotacao.erro !== false && (
                <ErrorQuote
                  susep={cotacao.susep}
                  msg={cotacao.erro.messages[0]}
                />
              )}
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
                    {Dictionary.company[cotacao.susep]}
                  </p>
                  <p>
                    <span className="bold">Coberturas</span>
                  </p>
                  {cotacao.resultadoCotacao.coberturas
                    .filter((v) => v.valor !== 0)
                    .map((q, index) => (
                      <p key={index}>
                        <span className="bold">{q.descricao}</span>
                        <br />
                        {ConvertCurrency(q.valor)}
                      </p>
                    ))}
                  <p>
                    <span className="bold">Valor da franquia</span> <br />
                    {cotacao.resultadoCotacao.franquias &&
                      cotacao.resultadoCotacao.franquias.map(
                        (v) =>
                          v.valor !== 0 && (
                            <>
                              <span>
                                {v.tipo + " - " + ConvertCurrency(v.valor)}
                              </span>
                              <br />
                            </>
                          )
                      )}
                  </p>
                  {cotacao.resultadoCotacao.coberturaFipe && (
                    <p>
                      <span className="bold">Cobertura da FIPE</span>
                      <br />
                      <span>{cotacao.resultadoCotacao.coberturaFipe}%</span>
                    </p>
                  )}
                  {cotacao.resultadoCotacao.servicos.length > 0 && (
                    <p>
                      <span className="bold">Serviços e Assistências</span>
                      <br />
                      {cotacao.resultadoCotacao.servicos.map((q, index) => (
                        <>
                          <span key={index}>{q.descricao}</span>
                          <br />
                        </>
                      ))}
                    </p>
                  )}
                  {cotacao.susep === 6572 && (
                    <p>
                      <span className="bold">Número da cotação HDI</span>
                      <br />
                      {cotacao.resultadoCotacao.idProtocolo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {lightbox_custom && (
            <div className="custom lightbox" onClick={this.BtnCustomOutClose}>
              <div className="content">
                <div className="header-title mb1">
                  <Title bold="Customizar"></Title>
                  <div onClick={this.BtnCustomClose} className="btn-close">
                    <CloseIcon />
                  </div>
                </div>
                <div className="infos">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <label className="block mb1">Cobertura Fipe</label>
                      <div className="range-bar">
                        <Slider
                          min={85}
                          max={110}
                          name="fipe"
                          marks={marks_fipe}
                          step={null}
                          value={customQuote.fipe}
                          onChange={this.onFipeChange}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="bold pt05">Assistência</p>
                    </Grid>
                    <Grid item xs={12}>
                      <label className="block mb1">Guincho</label>
                      <div className="range-bar">
                        <Slider
                          min={200}
                          max={600}
                          name="guincho"
                          marks={marks_guincho}
                          step={null}
                          value={customQuote.guincho}
                          onChange={this.onGuinchoChange}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="range ar">
                        <div className="pb05">
                          <label className="block pb05">Carro reserva</label>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={ar_condicionado}
                                onChange={this.handleChangeSwitch(
                                  "ar_condicionado"
                                )}
                                value={customQuote.ar_condicionado}
                                name="ar_condicionado"
                                color="primary"
                              />
                            }
                            label="Com ar"
                          />
                        </div>
                      </div>
                      <div className="range-bar">
                        <Slider
                          min={1}
                          max={4}
                          name="carro_reserva"
                          marks={marks_carro_reserva}
                          step={null}
                          value={customQuote.carro_reserva}
                          onChange={this.onCarroReservaChange}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <label className="block mb1">Cobertura de vidros</label>
                      <div className="range-bar">
                        <Slider
                          min={1}
                          max={3}
                          name="vidros"
                          marks={marks_vidros}
                          step={null}
                          value={customQuote.vidros}
                          onChange={this.onVidrosChange}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="remark">
                        <p>
                          *Básica: Para-brisas dianteiros, traseiros e laterais
                          <br />
                          *Completa: Para-brisas dianteiros, traseiros e
                          laterais + retrovisores, faróis dianteiros e traseiros
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <label className="block mb1">Franquia</label>
                      <div className="range-bar">
                        <Slider
                          min={1}
                          max={3}
                          name="franquia"
                          marks={marks_franquia}
                          step={null}
                          value={customQuote.franquia}
                          onChange={this.onFranquiaChange}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <label className="block mb1">Coberturas</label>
                      <div className="range-bar">
                        <Slider
                          min={1}
                          max={2}
                          name="coberturas"
                          marks={marks_coberturas}
                          step={null}
                          value={customQuote.coberturas}
                          onChange={this.onCoberturasChange}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="bold pt05">Cobertura de terceiros</p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="switch-range">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={danos_materiais_check}
                              onChange={this.handleChangeSwitch(
                                "danos_materiais_check"
                              )}
                              value={customQuote.danos_materiais_check}
                              name="danos_materiais_check"
                              color="primary"
                            />
                          }
                          label="Danos materiais"
                        />
                        <div className="value">{danos_materiais} mil</div>
                      </div>
                      {danos_materiais_check && (
                        <div className="range-bar pt05">
                          <Slider
                            min={10}
                            max={50}
                            name="danos_materiais"
                            marks={marks_danos_materiais}
                            step={1}
                            value={customQuote.danos_materiais}
                            onChange={this.onDanosMateriaisChange}
                          />
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <div className="switch-range">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={danos_corporais_check}
                              onChange={this.handleChangeSwitch(
                                "danos_corporais_check"
                              )}
                              value={customQuote.danos_corporais_check}
                              name="danos_corporais_check"
                              color="primary"
                            />
                          }
                          label="Danos corporais"
                        />
                        <div className="value">
                          {customQuote.danos_corporais} mil
                        </div>
                      </div>
                      {danos_corporais_check && (
                        <div className="range-bar pt05">
                          <Slider
                            min={10}
                            max={50}
                            name="danos_corporais"
                            marks={marks_danos_corporais}
                            step={1}
                            value={customQuote.danos_corporais}
                            onChange={this.onDanosCorporaisChange}
                          />
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <div className="switch-range">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={danos_morais_check}
                              onChange={this.handleChangeSwitch(
                                "danos_morais_check"
                              )}
                              value={customQuote.danos_morais_check}
                              name="danos_morais_check"
                              color="primary"
                            />
                          }
                          label="Danos morais"
                        />
                        <div className="value">
                          {customQuote.danos_morais} mil
                        </div>
                      </div>
                      {danos_morais_check && (
                        <div className="range-bar pt05">
                          <Slider
                            min={5}
                            max={50}
                            name="danos_morais"
                            marks={marks_danos_morais}
                            step={1}
                            value={customQuote.danos_morais}
                            onChange={this.onDanosMoraisChange}
                          />
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <p className="bold pt05">Cobertura de passageiros</p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="switch-range">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={morte_acidente_check}
                              onChange={this.handleChangeSwitch(
                                "morte_acidente_check"
                              )}
                              value={customQuote.morte_acidente_check}
                              name="danos_morais_check"
                              color="primary"
                            />
                          }
                          label="Morte por acidente"
                        />
                        <div className="value">
                          {customQuote.morte_acidente} mil
                        </div>
                      </div>
                      {morte_acidente_check && (
                        <div className="range-bar pt05">
                          <Slider
                            min={5}
                            max={50}
                            name="morte_acidente"
                            marks={marks_morte_acidente}
                            step={1}
                            value={customQuote.morte_acidente}
                            onChange={this.onMorteAcidenteChange}
                          />
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <div className="switch-range">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={invalidez_acidente_check}
                              onChange={this.handleChangeSwitch(
                                "invalidez_acidente_check"
                              )}
                              value={customQuote.invalidez_acidente_check}
                              name="invalidez_acidente_check"
                              color="primary"
                            />
                          }
                          label="Invalidez por acidente"
                        />
                        <div className="value">
                          {customQuote.invalidez_acidente} mil
                        </div>
                      </div>
                      {invalidez_acidente_check && (
                        <div className="range-bar pt05">
                          <Slider
                            min={5}
                            max={50}
                            name="invalidez_acidente"
                            marks={marks_invalidez_acidente}
                            step={1}
                            value={customQuote.invalidez_acidente}
                            onChange={this.onInvalidezAcidenteChange}
                          />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </div>
                <div className="actions">
                  <Link className="btn-next" onClick={this.getCustomQuote}>
                    Continuar compra
                  </Link>
                </div>
              </div>
            </div>
          )}

          {lightbox_agree && (
            <div
              className="custom lightbox"
              onClick={this.BtnLightboxAgreeOutClose}
            >
              <div className="content">
                <div className="header-title">
                  <Title bold="IMPORTANTE"></Title>
                  <div
                    onClick={this.BtnLightboxAgreeClose}
                    className="btn-close"
                  >
                    <CloseIcon />
                  </div>
                </div>
                <div className="entry">
                  <p className="subtitle bold">
                    Atenção!
                    <br /> Mensagem da {Dictionary.company[cotacao.susep]}.{" "}
                    <br />
                    Leia atentamente!
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cotacao.resultadoCotacao.mensagens
                        .toString()
                        .replace(new RegExp("\r?/n", "g"), "<br />"),
                    }}
                  />

                  <FormGroup row>
                    <div className="buttons">
                      <button
                        className="btn-outline"
                        onClick={this.BtnLightboxAgreeClose}
                      >
                        Não concordo
                      </button>
                      <button
                        className="btn-outline"
                        onClick={this.BtnRedirectCheckout}
                      >
                        Concordo
                      </button>
                    </div>
                  </FormGroup>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  }
}