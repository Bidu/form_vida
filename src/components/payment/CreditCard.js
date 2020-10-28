import React, { Component } from "react";
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

import {
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

class PayCreditCard extends Component {
  constructor(props) {
    super(props);
    const storage = JSON.parse(localStorage.getItem("@bidu2/veiculo"));
    const veiculo = JSON.parse(localStorage.getItem("@bidu2/seu-veiculo"));
    const dados = JSON.parse(localStorage.getItem("@bidu2/dados_cotacao"));

    const DataExepedicaoRg = DateToTimestamp(
      `${this.props.values.dia}-${this.props.values.mes}-${this.props.values.ano}`
    );

    this.state = {
      redirect: false,
      value: "",
      installments: "",
      day: "",
      month: "",
      year: "",
      renda: 0,
      agree: false,
      km0: storage.km0,
      seu_veiculo: JSON.parse(localStorage.getItem("@bidu2/seu-veiculo")),
      transmissao: {
        uuidPpu: localStorage.getItem("@bidu2/idPPU"),
        ipRemoto: "",
        id: localStorage.getItem("@bidu2/idcotacao"),
        susep: dados.susep,
        idProtocolo: dados.idProtocolo,
        cotacao: [],
        idCotacao: [],
        informacaoPagamento: {
          bandeira: "",
          metodoPagamento: "CREDITO",
          parcelas: 0,
          valorParcelas: 0,
          opcaoEnvioApolice: null,
          numeroCartao: "",
          validade: "",
          cvv: "",
          dataVencimentoBoleto: null,
          banco: null,
          agencia: null,
          conta: null,
          nomeTitular: "",
          dataPagamento: null,
        },
        informacaoSegurado: {
          rgOuRne: 0,
          dataExpedicao: 0,
          orgaoEmissor: "",
          ufEmissor: "",
          nacionalidade: "br",
          rendaMediaMensal: null,
        },
        informacaoVeiculo: {
          chassi: "",
          renavam: "",
          nota: "",
          concessionaria: "",
          placa: "",
          ufDaPlaca: "",
          empresa: "",
          cnpj: "",
          cnpj_concessionaria: "",
        },
        /*         informacaoFinanciamento: {
          empresaProvedora: "Thinkseg",
          cnpj: "2893729832",
        }, */
        informacaoDispositivoSeguranca: {
          numeroCertificado: 0,
        },
      },
    };
    this.props.setValues({
      ...this.props.values,
      km0: storage.km0,
      susep: dados.susep,
      alienado_financiado: veiculo.alienado_financiado,
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  informacaoPagamentoParcelas = (e) => {
    const numberParcela = e.currentTarget.firstChild.nodeValue;
    const valueParcela = e.target.value;
    const dados = JSON.parse(localStorage.getItem("@bidu2/dados_cotacao"));
    dados.precoParcelamento = (numberParcela * valueParcela).toFixed(2);
    localStorage.setItem("@bidu2/dados_cotacao", [JSON.stringify(dados)]);

    if (this.state.transmissao.susep === 6572) {
      this.setState({
        ...this.state,
        transmissao: {
          ...this.state.transmissao,
          informacaoPagamento: {
            metodoPagamento: "CREDITO",
            parcelas: e.currentTarget.firstChild.nodeValue,
            valorParcelas: e.target.value,
          },
        },
      });
    } else {
      this.setState({
        ...this.state,
        transmissao: {
          ...this.state.transmissao,
          informacaoPagamento: {
            ...this.state.transmissao.informacaoPagamento,
            parcelas: e.currentTarget.firstChild.nodeValue,
            valorParcelas: e.target.value,
          },
        },
      });
    }
  };

  informacaoPagamento = (e) => {
    if (this.state.transmissao.susep === 6572) {
      this.setState({
        ...this.state,
        transmissao: {
          ...this.state.transmissao,
          informacaoPagamento: {
            metodoPagamento: "CREDITO",
          },
        },
      });
    } else {
      this.setState({
        ...this.state,
        transmissao: {
          ...this.state.transmissao,
          informacaoPagamento: {
            ...this.state.transmissao.informacaoPagamento,
            metodoPagamento: "CREDITO",
            [e.target.name]: e.target.value,
          },
        },
      });
    }
  };

  getFlag = () => {
    return getCardFlag(this.props.values.numeroCartao);
  };

  informacaoPagamentoCartao = (e) => {
    this.setState({
      ...this.state,
      transmissao: {
        ...this.state.transmissao,
        informacaoPagamento: {
          ...this.state.transmissao.informacaoPagamento,
          bandeira: this.getFlag(),
          [e.target.name]: FormatDocument(e.target.value),
        },
      },
    });
  };

  informacaoVeiculo = (e) => {
    this.setState({
      ...this.state,
      transmissao: {
        ...this.state.transmissao,
        informacaoVeiculo: {
          ...this.state.transmissao.informacaoVeiculo,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  informacaoDispositivoSeguranca = (e) => {
    this.setState({
      ...this.state,
      transmissao: {
        ...this.state.transmissao,
        informacaoDispositivoSeguranca: {
          ...this.state.transmissao.informacaoDispositivoSeguranca,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  titularCartao = (e) => {
    const Data = [];
    if (this.props.values.dia) {
      Data.push(this.props.values.dia);
    }
    if (this.props.values.mes) {
      Data.push(this.props.values.mes);
    }
    if (this.props.values.ano) {
      Data.push(this.props.values.ano);
    }

    const dataExpedicao = DateToTimestamp(`${Data[0]}-${Data[1]}-${Data[2]}`);

    this.setState({
      ...this.state,
      transmissao: {
        ...this.state.transmissao,
        titularCartao: {
          ...this.state.transmissao.titularCartao,
          [e.target.name]: e.target.value,
        },
        informacaoSegurado: {
          ...this.state.transmissao.informacaoSegurado,
          rgOuRne: this.props.values.rgOuRne,
          orgaoEmissor: e.target.value,
          ufEmissor: e.target.value,
          dataExpedicao,
        },
      },
    });
  };

  titularCartaoRg = (e) => {
    this.setState({
      ...this.state,
      transmissao: {
        ...this.state.transmissao,
        titularCartao: {
          ...this.state.transmissao.titularCartao,
          [e.target.name]: FormatDocument(e.target.value),
        },
      },
    });
  };

  handleChangeInstallments = (event) => {
    this.setState({ installments: event.target.value });
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  renderDay(dia) {
    return <MenuItem value={dia}>{dia}</MenuItem>;
  }
  renderYear(ano) {
    return <MenuItem value={ano}>{ano}</MenuItem>;
  }
  handleChangeAgree = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.checked });
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Pgto_Aceite"),
    // });
    /*End Google Tag Manager*/
  };

  EnviaTransmissao = () => {
    const transmissao = this.state.transmissao;
    this.props.setValues({
      ...this.props.values,
      transmissao,
    });
  };

  componentDidMount() {
    localStorage.removeItem("@bidu2/transmissao");
    localStorage.removeItem("@bidu2/check_transmissao");
    const dados = JSON.parse(localStorage.getItem("@bidu2/dados_cotacao"));
    apiIP.get("/?format=text").then((res) => {
      const content = res.data;
      this.setState({
        ...this.state,
        transmissao: {
          ...this.state.transmissao,
          uuidPpu: localStorage.getItem("@bidu2/idPPU"),
          uuidHdi: dados.uuidHdi,
          ipRemoto: content,
          id: localStorage.getItem("@bidu2/idcotacao"),
          susep: dados.susep,
          idProtocolo: dados.idProtocolo,
          cotacao: JSON.parse(localStorage.getItem("@bidu2/cotacao")),
          idCotacao: JSON.parse(localStorage.getItem("@bidu2/cotacao")).idCotacao,
          "x-track-id": dados["x-track-id"],
          propriedadeSeguradora:
            dados.susep === 5177 ? dados.propriedadeSeguradora : "",
        },
        informacaoPagamento: [],
      });
    });

    let dias = [];
    let m = [];
    let a = [];
    let mes = [];

    const date = new Date();
    //Get all days in current month
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const getDays = new Date(year, month, 0).getDate();
    for (let d = day; d <= getDays; d++) {
      dias.push(d);
    }

    mes[0] = "Janeiro";
    mes[1] = "Fevereiro";
    mes[2] = "Março";
    mes[3] = "Abril";
    mes[4] = "Maio";
    mes[5] = "Junho";
    mes[6] = "Julho";
    mes[7] = "AugAgosto";
    mes[8] = "Setembro";
    mes[9] = "Outubro";
    mes[10] = "Novembro";
    mes[11] = "Dezembro";

    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = dataAtual.getMonth();
    let mesLiteral;
    for (let i = 0; i < 3; i++) {
      dataAtual.setMonth(mesAtual + i);
      dataAtual.setFullYear(anoAtual);
      mesLiteral = mes[mesAtual];
      anoAtual = mesAtual === 0 ? anoAtual + 1 : anoAtual;
      mesAtual = mesAtual === 0 ? 11 : mesAtual + 1;

      if (mesAtual > 12) {
        mesAtual = 0;
        m.push({
          n: mesAtual,
          mes: mes[mesAtual],
        });
        mesAtual++;
        a.push(anoAtual);
      } else {
        mesAtual = mesAtual - 1;
        m.push({
          n: mesAtual,
          mes: mesLiteral,
        });
        mesAtual++;
        a.push(anoAtual);
      }
    }

    const dados_transmissao = JSON.parse(
      localStorage.getItem("@bidu2/transmissao")
    );

    if (dados_transmissao) {
      this.setState({
        ...dados_transmissao,
      });
      this.props.setValues({
        ...dados_transmissao,
      });
    } else {
      this.setState({
        ...this.state,
        meses: m,
        anos: a,
        dias,
        transmissao: {
          ...this.state.transmissao,
          cotacao: JSON.parse(localStorage.getItem("@bidu2/cotacao")),
          idCotacao: JSON.parse(localStorage.getItem("@bidu2/cotacao")).idCotacao,
        },
      });
    }
  }

  informacaoAplicativo = (e) => {
    if (e.target.name === "senha")
      this.setState({
        ...this.state,
        transmissao: {
          ...this.state.transmissao,
          cotacao: {
            ...this.state.transmissao.cotacao,
            segurado: {
              ...this.state.transmissao.cotacao.segurado,
              [e.target.name]: e.target.value,
            },
          },
        },
      });
  };

  TermosCondicoes = (e) => {
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("Pgto_CGePP"),
    // });
    /*End Google Tag Manager*/
  };

  getParcelas() {
    const parcelas = localStorage.getItem("@bidu2/dados_cotacao");
    return JSON.parse(localStorage.getItem("@bidu2/dados_cotacao"));
  }

  orderByParcelas = (obj) => {
    let orderArr = [];
    orderArr = obj.sort((a, b) => {
      return a.quantidadeParcelas - b.quantidadeParcelas;
    });

    return orderArr;
  };

  onRendaMediaMensalChange = (value) => {
    value = value.target.value;
    this.setState({
      ...this.state,
      transmissao: {
        ...this.state.transmissao,
        informacaoSegurado: {
          ...this.state.transmissao.informacaoSegurado,
          rendaMediaMensal: value,
        },
      },
    });
    this.props.values.rendaMediaMensal = value;
  };

  handleChangeNacionalidade = (e) => {
    this.setState({
      ...this.state,
      transmissao: {
        ...this.state.transmissao,
        informacaoSegurado: {
          ...this.state.transmissao.informacaoSegurado,
          nacionalidade: e.target.value,
        },
      },
    });
  };

  /*   informacaoFinanciamento = (name) => (e) => {
    this.setState({
      ...this.state,
      transmissao: {
        ...this.state.transmissao,
        informacaoFinanciamento: {
          ...this.state.transmissao.informacaoFinanciamento,
          [name]: e.target.value,
        },
      },
    });
  }; */

  EnviaTransmissao = () => {
    this.props.setValues({
      ...this.props.values,
      transmissao: this.state.transmissao,
    });
  };

  render() {
    const { security } = this.props;
    let dias = [];
    for (let i = 1; i <= 31; i++) {
      dias.push(i);
    }
    let minOffset = 0,
      maxOffset = 80;
    let thisYear = new Date().getFullYear();
    let anos = [];
    for (let x = 0; x <= maxOffset; x++) {
      anos.push(thisYear - x);
    }
    const {
      status,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleSubmit,
    } = this.props;

    const dados = JSON.parse(localStorage.getItem("@bidu2/dados_cotacao"));
    const parcelas = [];
    for (let p = 1; p <= dados.parcelas; p++) {
      parcelas.push(<MenuItem value={p}>{p}x</MenuItem>);
    }

    const marks_renda = {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: {
        style: {
          left: "auto",
          right: "-25px",
        },
        label: "10ou+",
      },
    };

    if (this.props.status) {
      return <Redirect to={`/checkout/informacoes/${localStorage.getItem("@bidu2/idcotacao")}`} />;
    }

    return (
      <div className="pay-credit-card">
        <form onSubmit={handleSubmit}>
          {this.getParcelas().dadosParcelas && (
            <Grid container spacing={2} className="mt1">
              <Grid item xs={12} sm={6}>
                <InputLabel shrink id="parcelas">
                  Opções de parcelamento
                </InputLabel>
                <Select
                  labelId="parcelas"
                  fullWidth
                  displayEmpty
                  name="parcelas"
                  onChange={this.informacaoPagamentoParcelas}
                  onBlur={handleChange}
                  helperText={touched.parcelas ? errors.parcelas : ""}
                  error={touched.parcelas && Boolean(errors.parcelas)}
                >
                  <MenuItem value="000" disabled>
                    Selecione
                  </MenuItem>
                  {this.getParcelas().planosPagamento instanceof Array
                    ? this.getParcelas()
                        .dadosParcelas.filter(
                          (m) => m.modoPagamento === "CREDITCARD"
                        )
                        .map((p, index) =>
                          this.orderByParcelas(p.planoParcela).map((d) => (
                            <MenuItem
                              parcelas={d.quantidadeParcelas}
                              value={d.valorParcela}
                            >
                              {d.quantidadeParcelas}
                              {`x - `}
                              {ConvertCurrency(d.valorParcela)}
                              {` - `}
                              {(d.valorParcela * d.quantidadeParcelas).toFixed(
                                0
                              ) == this.getParcelas().preco.toFixed(0) ||
                              (d.valorParcela * d.quantidadeParcelas).toFixed(
                                0
                              ) < this.getParcelas().preco.toFixed(0)
                                ? "Sem Juros"
                                : "Com Juros"}
                            </MenuItem>
                          ))
                        )
                    : this.orderByParcelas(
                        this.getParcelas().dadosParcelas
                      ).map((p, index) => (
                        <MenuItem
                          parcelas={p.quantidadeParcelas}
                          value={p.valorParcela}
                        >
                          {p.quantidadeParcelas}
                          {`x - `}
                          {ConvertCurrency(p.valorParcela)}
                          {` - `}
                          {(p.valorParcela * p.quantidadeParcelas).toFixed(0) ==
                            this.getParcelas().preco.toFixed(0) ||
                          (p.valorParcela * p.quantidadeParcelas).toFixed(0) <
                            this.getParcelas().preco.toFixed(0)
                            ? "Sem Juros"
                            : "Com Juros"}
                        </MenuItem>
                      ))}
                </Select>
              </Grid>
            </Grid>
          )}
          {this.state.transmissao.susep !== 6572 && (
            <div className="card py1e5 my1e5">
              <p className="bold mb1">Informações de financiamento</p>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="num_cartao"
                    label="Número de Cartão"
                    placeholder="0000 0000 0000 0000"
                    fullWidth
                    name="numeroCartao"
                    onChange={handleChange}
                    onBlur={this.informacaoPagamentoCartao}
                    helperText={touched.numeroCartao ? errors.numeroCartao : ""}
                    error={touched.numeroCartao && Boolean(errors.numeroCartao)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: textMaskCredit,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="validade"
                    label="Validade"
                    placeholder="00/00"
                    fullWidth
                    name="validade"
                    onChange={this.informacaoPagamento}
                    onBlur={handleChange}
                    helperText={touched.validade ? errors.validade : ""}
                    error={touched.validade && Boolean(errors.validade)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: textMaskCredVal,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="cvv"
                    label="CVV"
                    placeholder="000"
                    fullWidth
                    name="cvv"
                    onChange={this.informacaoPagamento}
                    onBlur={handleChange}
                    helperText={touched.cvv ? errors.cvv : ""}
                    error={touched.cvv && Boolean(errors.cvv)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: textMaskCredCvv,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    id="nome"
                    label="Nome (como está no cartão)"
                    placeholder="Digite o nome"
                    fullWidth
                    name="nomeTitular"
                    onChange={this.informacaoPagamento}
                    onBlur={handleChange}
                    helperText={touched.nomeTitular ? errors.nomeTitular : ""}
                    error={touched.nomeTitular && Boolean(errors.nomeTitular)}
                    InputProps={{
                      inputComponent: onlyLetters,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          )}
          <div className="card py1e5 my1e5">
            <p className="bold mb1">Informações do segurado</p>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.rgOuRne ? this.props.values.rgOuRne : ""
                  }
                  id="rgOuRne"
                  label="RG ou RNE do comprador"
                  placeholder="00.000.000-0"
                  fullWidth
                  name="rgOuRne"
                  onChange={handleChange}
                  onBlur={this.titularCartaoRg}
                  helperText={touched.rgOuRne ? errors.rgOuRne : ""}
                  error={touched.rgOuRne && Boolean(errors.rgOuRne)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  /* InputProps={{
                    inputComponent: textMaskRG,
                  }} */
                />
              </Grid>
              <Grid item xs={12} className="pb0">
                <InputLabel shrink id="rg-date">
                  Data de expedição do RG
                </InputLabel>
              </Grid>
              <Grid item xs={4} className="pt0">
                <Select
                  value={this.props.values.dia ? this.props.values.dia : ""}
                  fullWidth
                  displayEmpty
                  labelId="rg-date"
                  id="dia"
                  name="dia"
                  onChange={handleChange}
                  onBlur={this.titularCartao}
                  helperText={touched.dia ? errors.dia : ""}
                  error={touched.dia && Boolean(errors.dia)}
                >
                  <MenuItem value="" disabled>
                    Dia
                  </MenuItem>
                  {dias.map(this.renderDay)}
                </Select>
              </Grid>
              <Grid item xs={4} className="pt0">
                <Select
                  value={this.props.values.mes ? this.props.values.mes : ""}
                  fullWidth
                  displayEmpty
                  labelId="rg-date"
                  id="month"
                  name="mes"
                  onChange={handleChange}
                  onBlur={this.titularCartao}
                  helperText={touched.mes ? errors.mes : ""}
                  error={touched.mes && Boolean(errors.mes)}
                >
                  <MenuItem value="" disabled>
                    Mês
                  </MenuItem>
                  <MenuItem value={1}>Janeiro</MenuItem>
                  <MenuItem value={2}>Fevereiro</MenuItem>
                  <MenuItem value={3}>Março</MenuItem>
                  <MenuItem value={4}>Abril</MenuItem>
                  <MenuItem value={5}>Maio</MenuItem>
                  <MenuItem value={6}>Junho</MenuItem>
                  <MenuItem value={7}>Julho</MenuItem>
                  <MenuItem value={8}>Agosto</MenuItem>
                  <MenuItem value={9}>Setembro</MenuItem>
                  <MenuItem value={10}>Outubro</MenuItem>
                  <MenuItem value={11}>Novembro</MenuItem>
                  <MenuItem value={12}>Dezembro</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4} className="pt0">
                <Select
                  value={this.props.values.ano ? this.props.values.ano : ""}
                  id="year"
                  fullWidth
                  displayEmpty
                  labelId="rg-date"
                  name="ano"
                  onChange={handleChange}
                  onBlur={this.titularCartao}
                  helperText={touched.ano ? errors.ano : ""}
                  error={touched.ano && Boolean(errors.ano)}
                >
                  <MenuItem value="" disabled>
                    Ano
                  </MenuItem>
                  {anos.map(this.renderYear)}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={
                    this.props.values.orgaoEmissor
                      ? this.props.values.orgaoEmissor
                      : ""
                  }
                  id="orgaoEmissor"
                  label="Órgão emissor"
                  placeholder="XXX"
                  fullWidth
                  name="orgaoEmissor"
                  onChange={handleChange}
                  onBlur={this.titularCartao}
                  helperText={touched.orgaoEmissor ? errors.orgaoEmissor : ""}
                  error={touched.orgaoEmissor && Boolean(errors.orgaoEmissor)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskOrgao,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={
                    this.props.values.ufEmissor
                      ? this.props.values.ufEmissor
                      : ""
                  }
                  id="ufEmissor"
                  label="UF Emissor"
                  placeholder="XX"
                  fullWidth
                  name="ufEmissor"
                  onChange={handleChange}
                  onBlur={this.titularCartao}
                  helperText={touched.ufEmissor ? errors.ufEmissor : ""}
                  error={touched.ufEmissor && Boolean(errors.ufEmissor)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskUF,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.nacionalidade
                      ? this.props.values.nacionalidade
                      : ""
                  }
                  id="nacionalidade"
                  name="nacionalidade"
                  label="Nacionalidade"
                  placeholder="Digite aqui"
                  fullWidth
                  onChange={handleChange}
                  onBlur={this.handleChangeNacionalidade}
                  helperText={touched.nacionalidade ? errors.nacionalidade : ""}
                  error={touched.nacionalidade && Boolean(errors.nacionalidade)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="mb05">
                <InputLabel shrink id="rendaMediaMensal">
                  Renda média mensal?
                </InputLabel>

                <Select
                  value={
                    this.props.values.rendaMediaMensal
                      ? this.props.values.rendaMediaMensal
                      : (this.props.values.rendaMediaMensal = 0)
                  }
                  labelId="rendaMediaMensal"
                  fullWidth
                  displayEmpty
                  name="rendaMediaMensal"
                  id="rendaMediaMensal"
                  onChange={this.onRendaMediaMensalChange}
                  onBlur={this.onRendaMediaMensalChange}
                  helperText={
                    touched.rendaMediaMensal ? errors.rendaMediaMensal : ""
                  }
                  error={
                    touched.rendaMediaMensal && Boolean(errors.rendaMediaMensal)
                  }
                >
                  <MenuItem value={0}>Não Informado</MenuItem>
                  <MenuItem value={1}>Até R$ 3.000,00</MenuItem>
                  <MenuItem value={2}>De R$ 3.000,01 a R$ 5.000,00</MenuItem>
                  <MenuItem value={3}>De R$ 5000,01 a R$ 10.000,00</MenuItem>
                  <MenuItem value={4}>De R$ 10.000,01 a R$ 20.000,00</MenuItem>
                  <MenuItem value={5}>Acima de R$ 20.000,00</MenuItem>
                  <MenuItem value={6}>Do lar, sem renda a informar</MenuItem>
                </Select>
                {/* <div className="range-bar">
                  <Slider
                    min={1}
                    max={10}
                    name="rendaMediaMensal"
                    marks={marks_renda}
                    step={null}
                    value={this.props.values.rendaMediaMensal}
                    onChange={this.onRendaChange}
                    onBlur={handleChange("rendaMediaMensal")}
                  />
                </div> */}
              </Grid>
            </Grid>
          </div>
          <div className="card py1e5 my1e5">
            <p className="bold mb1">Informações do veículo</p>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.chassi ? this.props.values.chassi : ""
                  }
                  id="chassi"
                  label="Chassi"
                  placeholder="0AA000AA000000AA00"
                  fullWidth
                  name="chassi"
                  onChange={handleChange}
                  onBlur={this.informacaoVeiculo}
                  helperText={touched.chassi ? errors.chassi : ""}
                  error={touched.chassi && Boolean(errors.chassi)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskChassi,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.renavam ? this.props.values.renavam : ""
                  }
                  id="renavam"
                  label="Renavam"
                  placeholder="00000000000"
                  fullWidth
                  name="renavam"
                  onChange={handleChange}
                  onBlur={this.informacaoVeiculo}
                  helperText={touched.renavam ? errors.renavam : ""}
                  error={touched.renavam && Boolean(errors.renavam)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskRenavan,
                  }}
                />
              </Grid>
              {this.state.km0 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={
                        this.props.values.nota ? this.props.values.nota : ""
                      }
                      id="nota"
                      label="Nota fiscal"
                      placeholder="Digite aqui"
                      fullWidth
                      name="nota"
                      onChange={handleChange}
                      onBlur={this.informacaoVeiculo}
                      helperText={touched.nota ? errors.nota : ""}
                      error={touched.nota && Boolean(errors.nota)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent: textMaskNF,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={
                        this.props.values.concessionaria
                          ? this.props.values.concessionaria
                          : ""
                      }
                      id="concessionaria"
                      label="Concessionária"
                      placeholder="Digite aqui"
                      fullWidth
                      name="concessionaria"
                      onChange={handleChange}
                      onBlur={this.informacaoVeiculo}
                      helperText={
                        touched.concessionaria ? errors.concessionaria : ""
                      }
                      error={
                        touched.concessionaria && Boolean(errors.concessionaria)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.props.values.placa}
                  label="Placa"
                  inputProps={{ "aria-label": "placa" }}
                  fullWidth
                  id="placa"
                  name="placa"
                  placeholder="Digite aqui"
                  placeholder={
                    this.props.values.placa
                      ? this.props.values.placa
                      : "Digite a placa"
                  }
                  onChange={handleChange}
                  onBlur={this.informacaoVeiculo}
                  helperText={touched.placa ? errors.placa : ""}
                  error={touched.placa && Boolean(errors.placa)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskPlate,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.ufDaPlaca
                      ? this.props.values.ufDaPlaca
                      : ""
                  }
                  id="ufDaPlaca"
                  label="UF da Placa"
                  placeholder="XX"
                  fullWidth
                  name="ufDaPlaca"
                  onChange={handleChange}
                  onBlur={this.informacaoVeiculo}
                  helperText={touched.ufDaPlaca ? errors.ufDaPlaca : ""}
                  error={touched.ufDaPlaca && Boolean(errors.ufDaPlaca)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskUF,
                  }}
                />
              </Grid>

              {this.state.km0 && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={
                      this.props.values.cnpj_concessionaria
                        ? this.props.values.cnpj_concessionaria
                        : ""
                    }
                    label="CNPJ da concessionária"
                    fullWidth
                    id="cnpj_concessionaria"
                    name="cnpj_concessionaria"
                    placeholder="Digite aqui"
                    placeholder={
                      this.props.values.cnpj_concessionaria
                        ? this.props.values.cnpj_concessionaria
                        : "Digite o CNPJ"
                    }
                    onChange={handleChange}
                    onBlur={this.informacaoVeiculo}
                    helperText={
                      touched.cnpj_concessionaria
                        ? errors.cnpj_concessionaria
                        : ""
                    }
                    error={
                      touched.cnpj_concessionaria &&
                      Boolean(errors.cnpj_concessionaria)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: textMaskCNPJ,
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </div>
          {this.state.seu_veiculo.alienado_financiado && (
            <div className="card py1e5 my1e5">
              <p className="bold mb1">Informações adicionais</p>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={
                      this.props.values.empresa ? this.props.values.empresa : ""
                    }
                    id="empresa"
                    name="empresa"
                    label="Empresa provedora do financiamento"
                    placeholder="Digite aqui"
                    fullWidth
                    onChange={handleChange}
                    onBlur={this.informacaoVeiculo}
                    helperText={touched.empresa ? errors.empresa : ""}
                    error={touched.empresa && Boolean(errors.empresa)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={this.props.values.cnpj ? this.props.values.cnpj : ""}
                    id="cnpj"
                    label="CNPJ"
                    placeholder="0000000000000-0000/00"
                    fullWidth
                    name="cnpj"
                    onChange={handleChange}
                    onBlur={this.informacaoVeiculo}
                    helperText={touched.cnpj ? errors.cnpj : ""}
                    error={touched.cnpj && Boolean(errors.cnpj)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: textMaskCNPJ,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          )}
          {this.state.transmissao.susep === 5908 && (
            <div className="card py1e5 my1e5">
              <p className="bold mb1">Senha do aplicativo</p>
              <p>
                É necessário que você crie uma senha com até 8 dígitos para
                acessar o aplicativo do seu seguro. Digite abaixo a senha
                desejada.
              </p>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    type="password"
                    id="senha"
                    label="Senha"
                    placeholder="**************"
                    fullWidth
                    name="senha"
                    onChange={this.informacaoAplicativo}
                    onBlur={handleChange}
                    helperText={touched.senha ? errors.senha : ""}
                    error={touched.senha && Boolean(errors.senha)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    type="password"
                    id="resenha"
                    label="Confirmar senha"
                    placeholder="**************"
                    fullWidth
                    name="resenha"
                    onChange={this.informacaoAplicativo}
                    onBlur={handleChange}
                    helperText={touched.resenha ? errors.resenha : ""}
                    error={touched.resenha && Boolean(errors.resenha)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          )}
          {this.state.seu_veiculo.modeloRastreador !== "" && (
            <div className="card py1e5 my1e5">
              <p className="bold mb1">
                Informações do dispositivo de segurança <TooltipDispositivo />
              </p>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="numeroCertificado"
                    label="Número do certificado do dispositivo"
                    placeholder="0000000000000"
                    fullWidth
                    name="numeroCertificado"
                    onChange={this.informacaoDispositivoSeguranca}
                    onBlur={handleChange}
                    helperText={
                      touched.numeroCertificado ? errors.numeroCertificado : ""
                    }
                    error={
                      touched.numeroCertificado &&
                      Boolean(errors.numeroCertificado)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: textMaskDispositivoSeg,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          )}
          <FormGroup row className="pt1e5 agree-container">
            <div className="agree mb1">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      this.props.values.agree ? this.props.values.agree : ""
                    }
                    color="primary"
                    onBlur={this.handleChangeAgree("agree")}
                    onChange={handleChange("agree")}
                    name="agree"
                    helperText={touched.agree ? errors.agree : ""}
                    error={touched.agree && Boolean(errors.agree)}
                    className={checkBoxValidate("agree", this.props)}
                  />
                }
              />
              <div className="termos-label">
                <span>
                  Li e aceito a{" "}
                  <a
                    className="txt-primary underline"
                    href="/terms_privacy/Política_de_Privacidade-14.02.2020.pdf"
                    target="_blank"
                  >
                    política de privacidade
                  </a>{" "}
                  e os{" "}
                  <a
                    className="txt-primary underline"
                    href="/terms_privacy/Termos_de_Uso-14.02.2020.pdf"
                    target="_blank"
                    onClick={this.TermosCondicoes}
                  >
                    termos e condições
                  </a>
                </span>
              </div>
            </div>
            <div className="warning-validation warning-left mt1">
              {this.props.isValid ||
                (this.props.submitCount > 0 && (
                  <div>
                    <strong>Atenção!</strong>- Preenchimento obrigatório dos
                    campos destacados.
                    {errors.agree ? <div>{errors.agree}</div> : null}
                  </div>
                ))}
            </div>

            {/*<div class="error-quote"> Houve um erro na coração. Tente novamente.</div></div> */}
            <div className="actions">
              <Button
                type="submit"
                className="btn-next"
                disabled={isSubmitting}
                onClick={this.EnviaTransmissao}
              >
                Continuar
              </Button>
              <Link
                className="btn-back"
                to={`/cotacao/${localStorage.getItem("@bidu2/idcotacao")}`}
              >
                <KeyboardBackspaceIcon /> Voltar
              </Link>
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }
}

const FormCartao = withFormik({
  mapPropsToValues: ({
    numeroCartao,
    validade,
    cvv,
    nomeTitular,
    parcelas,
    rgOuRne,
    orgaoEmissor,
    ufEmissor,
    ufDaPlaca,
    dia,
    mes,
    ano,
    chassi,
    renavam,
    nota,
    concessionaria,
    numeroCertificado,
    horaPreferencia,
    agree,
    km0,
    placa,
    senha,
    resenha,
    nacionalidade,
    rendaMediaMensal,
    empresa,
    cnpj,
    cnpj_concessionaria,
  }) => {
    return {
      numeroCartao: numeroCartao || "",
      validade: validade || "",
      cvv: cvv || "",
      nomeTitular: nomeTitular || "",
      parcelas: parcelas || "",
      rgOuRne: rgOuRne || "",
      orgaoEmissor: orgaoEmissor || "",
      ufEmissor: ufEmissor || "",
      dia: dia || "",
      mes: mes || "",
      ano: ano || "",
      chassi: chassi || "",
      renavam: renavam || "",
      nota: nota || "",
      concessionaria: concessionaria || "",
      numeroCertificado: numeroCertificado || "",
      horaPreferencia: horaPreferencia || "",
      agree: agree || "",
      km0: km0 || "",
      placa: placa || "",
      ufDaPlaca: ufDaPlaca || "",
      senha: senha || "",
      resenha: resenha || "",
      nacionalidade: nacionalidade || "",
      rendaMediaMensal: rendaMediaMensal || "",
      empresa: empresa || "",
      cnpj: cnpj || "",
      cnpj_concessionaria: cnpj_concessionaria || "",
    };
  },
  validationSchema: (props) => {
    return Yup.lazy((values) => {
      return Yup.object().shape({
        parcelas: Yup.string().test("parcelas", "Obrigatório", (value) => {
          if (!value && values.susep !== 5908) {
            return false;
          } else {
            return true;
          }
        }),
        /*         numeroCartao: Yup.string()
          .required("Digite o número do cartão")
          .max(19, "Muito longo")
          .min(19, "Muito curto"), */
        numeroCartao: Yup.string().test(
          "cartao",
          "Digite o número do cartão",
          (value) => {
            if (!value && values.transmissao.susep !== 6572) {
              return false;
            } else {
              return true;
            }
          }
        ),
        /* validade: Yup.string()
          .required("Digite a validade do cartão")
          .min(5, "Muito curto")
          .max(5, "Muito longo") */
        validade: Yup.string().test(
          "validade_cartao",
          "Digite a validade do cartão",
          (value) => {
            if (!value && values.transmissao.susep !== 6572) {
              return false;
            } else {
              return true;
            }
          }
        ),
        /* cvv: Yup.string()
          .required("Digite o cvv do cartão")
          .min(3, "Muito curto")
          .max(3, "Muito longo") */
        cvv: Yup.string().test("cvv", "Digite o cvv do cartão", (value) => {
          if (!value && values.transmissao.susep !== 6572) {
            return false;
          } else {
            return true;
          }
        }),
        /* nomeTitular: Yup.string()
          .required("Obrigatório")
          .max(200, "Nome é muito longo")
          .test("nome", "Informe um nome válido", (value) => {
            return nameField(value);
          }) */
        nomeTitular: Yup.string().test(
          "nome",
          "Informe um nome válido",
          (value) => {
            if (!value && values.transmissao.susep !== 6572) {
              return false;
            } else {
              return true;
            }
          }
        ),
        rgOuRne: Yup.string()
          .required("Digite o RG do comprador.")
          .min(7, "Muito curto")
          .max(15, "Muito longo"),
        orgaoEmissor: Yup.string()
          .required("Obrigatório.")
          .min(2, "Muito curto"),
        ufEmissor: Yup.string().required("Obrigatório.").min(2, "Muito curto"),
        dia: Yup.string().required("Selecione o dia"),
        mes: Yup.string().required("Selecione o mês"),
        ano: Yup.string().required("Selecione o ano"),
        chassi: Yup.string()
          .required("Digite o chassi.")
          .min(17, "Muito curto")
          .max(17, "Muito longo"),
        renavam: Yup.string()
          .required("Digite o renavam.")
          .min(9, "Muito curto")
          .max(11, "Muito longo"),
        senha: Yup.string().test("senha_1", "Obrigatório", (value) => {
          const cotacao = JSON.parse(
            localStorage.getItem("@bidu2/dados_cotacao")
          );
          if (cotacao.susep === 5908) {
            if (value) {
              return true;
            }
          } else {
            return true;
          }
        }),
        resenha: Yup.string().oneOf(
          [Yup.ref("senha"), null],
          "As senhas não conferem"
        ),
        placa: Yup.string().required("Placa é obrigatória"),
        nota: Yup.string().test("nota", "Obrigatório", (value) => {
          const veiculo = JSON.parse(localStorage.getItem("@bidu2/veiculo"));
          if (veiculo.km0) {
            if (value) {
              return true;
            }
          } else {
            return true;
          }
        }),
        concessionaria: Yup.string().test(
          "concessionaria",
          "Obrigatório",
          (value) => {
            const veiculo = JSON.parse(localStorage.getItem("@bidu2/veiculo"));
            if (veiculo.km0) {
              if (value) {
                return true;
              }
            } else {
              return true;
            }
          }
        ),
        numeroCertificado: Yup.string().test(
          "certificado",
          "Obrigatório",
          (value) => {
            const seu_veiculo = JSON.parse(
              localStorage.getItem("@bidu2/seu-veiculo")
            );
            if (seu_veiculo.modeloRastreador !== "") {
              if (value) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          }
        ),
        nacionalidade: Yup.string()
          .required("Obrigatório.")
          .min(2, "Muito curto"),
        /*         empresa: Yup.string().required("Obrigatório."),
        cnpj: Yup.string().required("Obrigatório."), */
        rendaMediaMensal: Yup.string().required("Obrigatório."),
        empresa: Yup.string().test("empresa", "Obrigatório", (value) => {
          if (value) {
            return true;
          } else if (values.alienadoFinanciado) {
            return false;
          } else {
            return true;
          }
        }),
        cnpj: Yup.string().test("cnpj", "Obrigatório", (value) => {
          if (value) {
            return true;
          } else if (values.alienadoFinanciado) {
            return false;
          } else {
            return true;
          }
        }),
        cnpj_concessionaria: Yup.string().test(
          "cnpj_concessionaria",
          "Obrigatório",
          (value) => {
            if (value) {
              return true;
            } else if (values.km0) {
              return false;
            } else {
              return true;
            }
          }
        ),
        agree: Yup.boolean().test(
          "is-true",
          "- Você deve aceitar os termos e condições",
          (value) => value === true
        ),
      });
    });
  },
  handleSubmit: (values, { props, setStatus, setValues, setSubmitting }) => {
    setTimeout(() => {
      // submit to the server

      //console.warn(JSON.stringify(values.transmissao, null, 2));

      localStorage.setItem("@bidu2/transmissao", [JSON.stringify(values)]);
      localStorage.setItem("@bidu2/check_transmissao", [
        JSON.stringify(values.transmissao),
      ]);

      setStatus(true);
      setSubmitting(false);
    }, 1000);
    setSubmitting(false);
  },
})(PayCreditCard);

export default FormCartao;
