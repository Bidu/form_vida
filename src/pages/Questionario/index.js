import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../store/actions/user";
import { FormatDocument, DateToTimestamp, GTM } from "../../helpers";
import apiCEP from "../../services/cep";
import Wrapper from "../../components/wrapper";
import { Steps } from "../../components/steps";
import Title from "../../components/Title";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withFormik } from "formik";
import * as Yup from "yup";
import * as API from "../../services/bd/CadastrarCotacao";
import { adicionarLeadCotacao } from "../../store/actions/addLeadBd";
import { apiQualicorp } from "../../services/bdBo";
import Checkout from "../../pages/Checkout"
import axios from "axios";
import DialogDependents from "../../components/DialogDependents";
import Birthday from "../../components/Birthday";
import DialogAlert from "../../components/DialogAlert";
import { bdQuali } from "../../services/bdQuali";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { bruf } from "../../services/bruf";
import TermosUso from "../../components/TermosUso";
import {
  textMaskPhone,
  textMaskNumber,
  textMaskCpf,
  textMaskCEP,
  onlyNumbers,
  CheckCPF,
  onlyLetters,
  nameField,
} from "../../helpers/user";
import "./questionario.css";

import { checkValidateRadios } from "../../helpers";
import Loading from "../../components/loading";
import { CadastrarCotacaoBd } from "../../services/bd/CadastrarCotacao";
import { country } from "../../helpers/country";
import orgaoExp, { orgaoexpedidor } from "../../helpers/orgaoexpedidor";

import { createBrowserHistory } from "history";
import countrys from "../../helpers/country";
// import Checkout from "../Checkout";
// import { entities } from "../../helpers/entities";
class Questionario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pratica_esportes: 0,
      include_recipient: 0,
      foreign: 0,
      loading: false,
      error: false,
      include_sports: 0,
      loading: false,
      error: false,
      possui_rne: 0,
      // request: true,
      //redirect: false,
      cep: "",
      occupations: [],
      entities: [],
      optin: null,
      usuario: {
        cpf: "",
        nome: "",
        politicamente_exp: false,
        email: "",
        telefone: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        cep: "",
        estado: "",
        uf: "",
        complemento: "",
        date_birth: "",
        nasc_dia: "",
        nasc_mes: "",
        nasc_ano: "",
        genero: "",
        profissao: "",
        escolaridade: "",
        moradia: false,
        pratica_esportes: 1,
        include_sports: 1,
        frequency: false,
        foreign: 0,
        possui_rne: 0,
        nome: "",
        grau_de_parentesco: "",
        date_birth_beneficiario: "",
        marital: "",
        type_doc:"",
        date_exp:"",
        rne:"",
        passaporte:"",
        pais_emissor:"",
        frequency:"",
      },
      dependents: [],
      storage: JSON.parse(localStorage.getItem("@bidu2/user")),
      estados: [],
      cidades: [],
    };
    this.handleCEP = this.handleCEP.bind(this);
  }

  async componentDidMount() {
    this.props.setValues({
      ...this.props.values,
      pratica_esportes: 0,
    });
    this.props.setValues({
      ...this.props.values,
      include_sports: 0,
    });

    this.props.setValues({
      ...this.props.values,
      include_recipient: 0,
    });

    this.props.setValues({
      ...this.props.values,
      foreign: 0,
    });
    this.props.setValues({
      ...this.props.values,
      possui_rne: 0,
    });

    const storage = JSON.parse(localStorage.getItem("@bidu2/user"));

    delete storage.entities;
    delete storage.entidade;
    delete storage.operadoras;
    delete storage.estado;
    delete storage.cidade;
    delete storage.dependents;
    this.props.values.operadoras = [];
    localStorage.setItem("@bidu2/user", JSON.stringify(storage));

    if (storage.length !== 0) {
      this.setState(storage);
      this.props.setValues(storage);
    }
    this.props.setStatus(false);
  }

  handleCEP = (e) => {
    const cep = e.target.value;
    if (cep.length == 9) {
      this.setState({
        cep,
      });
      //if (this.state.cep.length === 8) {
      setTimeout(() => {
        this.getAddress();
      }, 500);
      //}
    } else {
      this.setState({
        usuario: {
          ...this.state.usuario,
          cidade: "",
          estado: "",

          uf: "",
        },
        loading: false,
      });
      this.props.values.rua = "";
      delete this.props.values.profissao;
    }
  };

  handleChangeInsurance = (value) => (event) => {
    event.preventDefault();
    this.setState({ pratica_esportes: value });
    this.props.setValues({
      ...this.props.values,
      insurance: true,
      pratica_esportes: 1,
    });
  };

  handleChangeInsuranceFalse = (value) => (event) => {
    event.preventDefault();
    this.setState({ pratica_esportes: value });
    this.props.setValues({
      ...this.props.values,
      pratica_esportes: 2,
      insurance: false,
    });
  };
  handleChangeInclude = (value) => (event) => {
    event.preventDefault();
    this.setState({ include_sports: value });
    this.props.setValues({
      ...this.props.values,
      insurance: true,
      include_sports: 1,
    });
  };

  handleChangeIncludeFalse = (value) => (event) => {
    event.preventDefault();
    this.setState({ include_sports: value });
    this.props.setValues({
      ...this.props.values,
      include_sports: 2,
      insurance: false,
    });
  };

  handleChangeRecipient = (value) => (event) => {
    event.preventDefault();
    this.setState({ include_recipient: value });
    this.props.setValues({
      ...this.props.values,
      insurance: true,
      include_recipient: 1,
    });
  };

  handleChangeRecipientFalse = (value) => (event) => {
    event.preventDefault();
    this.setState({ include_recipient: value });
    this.props.setValues({
      ...this.props.values,
      include_recipient: 2,
      insurance: false,
    });
  };
  handleChangeForeign = (value) => (event) => {
    event.preventDefault();
    this.setState({ foreign: value });
    this.props.setValues({
      ...this.props.values,
      foreign: 1,
      insurance: true,
    });
  };
  handleChangeForeignFalse = (value) => (event) => {
    event.preventDefault();
    this.setState({ foreign: value });
    this.props.setValues({
      ...this.props.values,
      foreign: 2,
      insurance: false,
    });
  };
  handleChangeRne = (value) => (event) => {
    event.preventDefault();
    this.setState({ possui_rne: value });
    this.props.setValues({
      ...this.props.values,
      possui_rne: 1,
      insurance: true,
    });
  };
  handleChangeRneFalse = (value) => (event) => {
    event.preventDefault();
    this.setState({ possui_rne: value });
    this.props.setValues({
      ...this.props.values,
      possui_rne: 2,
      insurance: false,
    });
  };
  getAddress = async (e) => {
    this.setState({ loading: true });
    let content = await apiQualicorp.endereco(this.state.cep.replace("-", ""));
    if (content && content.data) {
      await this.getOccupations(content.data);

      this.setState({
        usuario: {
          ...this.state.usuario,
          rua: content.data.logradouro,
          cidade: content.data.cidade,
          bairro: content.data.bairro,
          estado: content.data.estado,
          cep: content.data.cep,
          uf: content.data.estado,
        },
        loading: false,
      });
      this.props.values.rua = content.data.logradouro;
      this.props.values.cidade = content.data.cidade;
      this.props.values.bairro = content.data.bairro;
      this.props.values.estado = content.data.estado;
      this.props.values.cep = content.data.cep;
      this.props.values.uf = content.data.estado;
    } else {
      this.setState({
        usuario: {
          ...this.state.usuario,
          cep: undefined,
        },
        loading: false,
      });
    }
  };

  getOccupations = async (estado, cidade) => {
    this.setState({
      loading: true,
      occupations: [],
      occupationsFalse: true,
    });
    let occupations = await apiQualicorp.publicoAlvo(estado, cidade);
    if (occupations && occupations.data && occupations.data.length > 0) {
      this.setState({ occupations: occupations.data, loading: false });
    } else {
      this.setState({
        occupations: [],
        occupationsFalse: false,
      });
    }
  };

  getEntities = async (profissao, uf, cidade) => {
    this.setState({
      loading: true,
      entities: [],
      entitiesFalse: true,
    });
    this.props.values.operadoras = [];
    let entities = await apiQualicorp.entidades(profissao, uf, cidade);

    if (entities && entities.data && entities.data.length > 0) {
      this.props.values.entities = entities.data;

      // entities.data.map((v) => {
      //   this.getOperator(v.id, uf, cidade)
      // })
      this.setState({
        entities: entities.data,
        loading: false,
      });
    } else {
      this.setState({
        entities: [],
        loading: false,
        entitiesFalse: false,
      });
    }
  };
  getOperator = async (entitie, uf, cidade) => {
    this.setState({
      loading: true,
      operadoras: [],
      operadorasFalse: true,
    });

    let operadoras = await apiQualicorp.operadoras(uf, cidade, entitie);

    if (operadoras && operadoras.data && operadoras.data.length > 0) {
      let resOperadoras = [
        operadoras.data.map((v) => {
          return {
            id: v.id,
            name: v.nome,
            entite: entitie,
          };
        }),
      ];
      this.props.values.operadoras = [
        ...this.props.values.operadoras,
        resOperadoras[0],
      ];

      this.setState({
        operadoras: operadoras.data,
        loading: false,
      });
    } else {
      this.setState({
        operadoras: [],
        loading: false,
        operadorasFalse: false,
      });
    }
  };

  handleChange = (event) => {
    if (event.target.name == "profissao") {
      this.props.values.profissao = event.target.value;
      this.getEntities(
        this.props.values.profissao,
        this.props.values.estado,
        this.props.values.cidade
      );
    }
    if (event.target.name == "entidade") {
      this.props.values.entidade = event.target.value;
      this.getOperator(
        this.props.values.entidade,
        this.props.values.estado,
        this.props.values.cidade
      );
    }
    if (event.target.name == "operadora") {
      this.props.values.operadora = event.target.value;
    }

    this.setState({
      usuario: {
        ...this.state.usuario,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleChangeSports = (value) => {
    // event.preventDefault();
    this.setState({ pratica_esportes: value });
    console.log(value);
    this.props.setValues({
      ...this.props.values,
      pratica_esportes: value,
    });

    console.log(this.props);
  };
  handleChangeIncludeSports = (value) => {
    // event.preventDefault();
    this.setState({ include_sports: value });
    console.log(value);
    this.props.setValues({
      ...this.props.values,
      include_sports: value,
    });

    console.log(this.props);
  };

  handleChangeSwitch = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.checked,
    });
  };

  renderDay(dia) {
    return <MenuItem value={dia}>{dia}</MenuItem>;
  }
  renderYear(ano) {
    return <MenuItem value={ano}>{ano}</MenuItem>;
  }

  handleSubmitBkp = (e) => {
    e.preventDefault();
    const { usuario } = this.state;
    this.props.adicionaUser(usuario);
    this.setState({ redirect: true });
  };

  setDependents = (dependents) => {
    this.setState({ dependents });
    this.props.values.dependents = dependents;
  };

  render() {
    const { loading, redirect, usuario, storage } = this.state;
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
      pratica_esportes,
      include_sports,
      foreign,
      possui_rne,
      nome,
      grau_de_parentesco,
      date_birth_beneficiario,
      marital,
      type_doc,
      date_exp,
      rne,
      passaporte,
      pais_emissor,
      frequency,
    } = this.props;

    const { include_recipient } = this.state;

    if (this.props.status) {
      return <Redirect to={`/questionario/${localStorage.getItem("@bidu2/idCotacao")}`} />;
    }

    return (
      <>
        <Wrapper>
          <Steps step1={true} step2={true} step3={true} step4S={true} />
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Checkout/> 
              <Grid item xs={6} sm={6}>
              <Title text="Dados do" bold="Beneficiário" />
                <p>Gostaria de identificar um Beneficiário?</p>
                {loading && <Loading />}
                <FormGroup row>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <div className="buttons pb05">
                        <button
                          className={`btn-outline ${
                            this.props.values.include_recipient === 1
                              ? "active"
                              : ""
                          }`}
                          value={1}
                          type="button"
                          onClick={this.handleChangeRecipient()}
                        >
                          Sim
                        </button>{" "}
                        <button
                          className={`btn-outline ${
                            this.props.values.include_recipient === 2
                              ? "active"
                              : ""
                          }`}
                          value={2}
                          type="button"
                          onClick={this.handleChangeRecipientFalse()}
                        >
                          Não
                        </button>
                      </div>
                    </Grid>
                  </Grid>
                </FormGroup>
                {/* INPUT DO BENEFICARIO*/}
                {this.props.values.include_recipient === 1 && (
                  <>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        value={
                          this.props.values.nome ? this.props.values.nome : ""
                        }
                        type="text"
                        id="nome"
                        name="nome"
                        label="Nome"
                        placeholder="João da Silva"
                        fullWidth
                        onChange={handleChange}
                        onBlur={this.handleChange}
                        helperText={touched.nome ? errors.nome : ""}
                        error={touched.nome && Boolean(errors.nome)}
                        InputProps={{
                          inputComponent: onlyLetters,
                          autoComplete: "off",
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <br />

                    <Grid item xs={12} sm={12}>
                      <InputLabel shrink id="grau_parentesco">
                        Grau de Parentesco
                      </InputLabel>
                      <Select
                        name="grau_parentesco"
                        fullWidth
                        displayEmpty
                        labelId="grau_parentesco"
                        id="grau_parentesco"
                        value={
                          this.props.values.grau_parentesco
                            ? this.props.values.grau_parentesco
                            : ""
                        }
                        onChange={handleChange("grau_parentesco")}
                        onBlur={this.handleChange}
                        helperText={
                          touched.grau_parentesco ? errors.grau_parentesco : ""
                        }
                        error={
                          touched.grau_parentesco &&
                          Boolean(errors.grau_parentesco)
                        }
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
                    <br />
                    <Grid item xs={6} sm={12}>
                      <TextField
                        value={
                          this.props.values.percentual
                            ? this.props.values.percentual
                            : ""
                        }
                        id="percentual"
                        name="percentual"
                        label="Percentual"
                        placeholder="Ex: 50"
                        fullWidth
                        onChange={handleChange}
                        onBlur={this.handleChange}
                        helperText={touched.percentual ? errors.percentual : ""}
                        error={touched.percentual && Boolean(errors.percentual)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <br />
                    <Grid item xs={12} sm={12}>
                      <InputLabel>Data de nascimento</InputLabel>
                      <TextField
                        name="date_birth_beneficiario"
                        id="date_birth_beneficiario"
                        type="date"
                        value={
                          this.props.values.date_birth_beneficiario
                            ? this.props.values.date_birth_beneficiario
                            : ""
                        }
                        onChange={handleChange("date_birth_beneficiario")}
                        onBlur={this.handleChange}
                        helperText={
                          touched.date_birth_beneficiario
                            ? errors.date_birth_beneficiario
                            : ""
                        }
                        error={
                          touched.date_birth_beneficiario &&
                          Boolean(errors.date_birth_beneficiario)
                        }
                      />
                    </Grid>
                    <br />

                    {}
                  </>
                )}
                <Title text="Dados do" bold="Segurado" />
                <Grid item xs={12} sm={12}>
                  <InputLabel shrink id="formation">
                    Escolaridade
                  </InputLabel>
                  <Select
                    name="escolaridade"
                    fullWidth
                    displayEmpty
                    labelId="escolaridade"
                    id="escolaridade"
                    value={
                      this.props.values.escolaridade
                        ? this.props.values.escolaridade
                        : ""
                    }
                    onChange={handleChange("escolaridade")}
                    onBlur={this.handleChange}
                    helperText={touched.escolaridade ? errors.escolaridade : ""}
                    error={touched.escolaridade && Boolean(errors.escolaridade)}
                  >
                    <MenuItem className="txt-dark_gray" value="" disabled>
                      Selecione
                    </MenuItem>
                    <MenuItem value="LITERATE">Alfabetizado</MenuItem>
                    <MenuItem value="'PRIMARY_EDUCATION'">
                      Fundamental (1º Grau)
                    </MenuItem>
                    <MenuItem value="SECONDARY_EDUCATION">
                      Médio (2º Grau)
                    </MenuItem>
                    <MenuItem value="TERTIARY_EDUCATION">Superior</MenuItem>
                    <MenuItem value="POST_GRADUATE">Pós-Graduação</MenuItem>
                    <MenuItem value="NONE">Nenhum</MenuItem>
                  </Select>
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <InputLabel shrink id="estado_civil">
                    Estado Civil
                  </InputLabel>
                  <Select
                    name="marital"
                    fullWidth
                    displayEmpty
                    labelId="estado_civil"
                    id="estado_civil"
                    value={
                      this.props.values.marital ? this.props.values.marital : ""
                    }
                    onChange={handleChange("marital")}
                    onBlur={this.handleChange}
                    helperText={touched.marital ? errors.marital : ""}
                    error={touched.marital && Boolean(errors.marital)}
                  >
                    <MenuItem value="" disabled>
                      Selecione
                    </MenuItem>
                    <MenuItem value="SINGLE">Solteiro(a)</MenuItem>
                    <MenuItem value="MARRIED">
                      Casado(a) ou União Estável
                    </MenuItem>
                    <MenuItem value="DIVORCED">Divorciado(a)</MenuItem>
                    <MenuItem value="SEPARATED">
                      Separado(a) judicialmente
                    </MenuItem>
                    <MenuItem value="WIDOW">Viúvo(a)</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.props.values.politicamente_exp}
                      value={this.props.values.politicamente_exp}
                      onChange={handleChange("politicamente_exp")}
                      onBlur={this.handleChangeSwitch("politicamente_exp")}
                      name="politicamente_exp"
                      color="primary"
                    />
                  }
                  label="Me considero uma pessoa politicamente exposta"
                />
              </Grid>
              <br />
              <br />
              <Grid item xs={12} sm={12}>
                <Title text="Documento do" bold="Segurado" />
                <br />
                <br />
                <Grid item xs={6} sm={6}>
                  <InputLabel shrink id="type_doc">
                    Tipo do Documento
                  </InputLabel>
                  <Select
                    value={this.props.values.document}
                    labelId="type_doc"
                    id="type_doc"
                    name="document"
                    fullWidth
                    displayEmpty
                    // onChange={handleChange("esportes")}
                    // onBlur={this.informacaoPagamento}
                    helperText={touched.document ? errors.document : ""}
                    error={touched.document && Boolean(errors.document)}
                  >
                    <MenuItem value="Selecione" disabled>
                      Selecione
                    </MenuItem>
                    {orgaoExp.map((e, key) => (
                      <MenuItem value={e.orgao}>{e.orgao}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <br />
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={
                      this.props.values.numero_doc ? this.props.values.numero_doc : ""
                    }
                    id="numero_doc"
                    name="numero_doc"
                    label="Número"
                    placeholder="Digite aqui"
                    fullWidth
                    onChange={handleChange}
                    onBlur={this.handleChange}
                    helperText={touched.numero_doc ? errors.numero_doc : ""}
                    error={touched.numero_doc && Boolean(errors.numero_doc)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={6}>
                  <InputLabel>Data de expedição</InputLabel>
                  <TextField
                    name="date_exp"
                    id="date_exp"
                    type="date"
                    value={
                      this.props.values.date_exp
                        ? this.props.values.date_exp
                        : ""
                    }
                    onChange={handleChange("date_exp")}
                    onBlur={this.handleChange}
                    helperText={touched.date_exp ? errors.date_exp : ""}
                    error={touched.date_exp && Boolean(errors.date_exp)}
                  />
                </Grid>

                <br />
                <Grid item xs={12} sm={12}>
                  <p>É estrangeiro?</p>
                  {loading && <Loading />}
                  <FormGroup row>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <div className="buttons pb05">
                          <button
                            className={`btn-outline ${
                              this.props.values.foreign === 1 ? "active" : ""
                            }`}
                            value={1}
                            type="button"
                            onClick={this.handleChangeForeign()}
                          >
                            Sim
                          </button>{" "}
                          <button
                            className={`btn-outline ${
                              this.props.values.foreign === 2 ? "active" : ""
                            }`}
                            value={2}
                            type="button"
                            onClick={this.handleChangeForeignFalse()}
                          >
                            Não
                          </button>
                        </div>
                      </Grid>
                    </Grid>
                  </FormGroup>
                  {/* poussui rne */}
                  {this.props.values.foreign === 1 && (
                    <>
                      <p>Possui RNE?</p>
                      <Grid item xs={12} sm={12}>
                        <div className="buttons pb05">
                          <button
                            className={`btn-outline ${
                              this.state.poussi_rne === 1 ? "active" : ""
                            }`}
                            value={1}
                            type="button"
                            onClick={this.handleChangeRne()}
                          >
                            Sim
                          </button>{" "}
                          <button
                            className={`btn-outline ${
                              this.state.poussi_rne === 2 ? "active" : ""
                            }`}
                            value={2}
                            type="button"
                            onClick={this.handleChangeRneFalse()}
                          >
                            Não
                          </button>
                        </div>
                      </Grid>
                    </>
                  )}
                  {this.props.values.possui_rne === 1 && (
                    <>
                      <Grid item xs={4} sm={6}>
                        <TextField
                          value={
                            this.props.values.rne ? this.props.values.rne : ""
                          }
                          id="rne"
                          name="rne"
                          label="Número do RNE"
                          placeholder="Digite aqui"
                          fullWidth
                          onChange={handleChange}
                          onBlur={this.handleChange}
                          helperText={touched.rne ? errors.rne : ""}
                          error={touched.rne && Boolean(errors.rne)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </>
                  )}
                  {this.props.values.possui_rne === 2 && (
                    <>
                      <Grid item xs={4} sm={6}>
                        <TextField
                          value={
                            this.props.values.passaporte
                              ? this.props.values.passaporte
                              : ""
                          }
                          id="passaporte"
                          name="passaporte"
                          label="Número do Passapote"
                          placeholder="Digite aqui"
                          fullWidth
                          onChange={handleChange}
                          onBlur={this.handleChange}
                          helperText={
                            touched.passaporte ? errors.passaporte : ""
                          }
                          error={
                            touched.passaporte && Boolean(errors.passaporte)
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <br />
                      <Grid item xs={12} sm={6}>
                        <InputLabel shrink id="pais_emissor">
                          País Emissor
                        </InputLabel>
                        <Select
                          value={this.props.values.pais_emissor}
                          labelId="pais_emissor"
                          id="pais_emissor"
                          name="pais_emissor"
                          fullWidth
                          displayEmpty
                          // onChange={handleChange("pais_emissor")}
                          // onBlur={this.informacaoPagamento}
                          helperText={
                            touched.pais_emissor ? errors.pais_emissor : ""
                          }
                          error={
                            touched.pais_emissor && Boolean(errors.pais_emissor)
                          }
                        >
                        <MenuItem value="" disabled>
                          Selecione
                        </MenuItem>
                          {countrys.map((e, key) => (
                            <MenuItem value={e.country}>{e.country}</MenuItem>
                          ))}
                          {/* {this.state.dados_cotacao.bancos[0] instanceof Array
                    ? this.state.dados_cotacao.bancos[0].map((banco, index) => (
                      <MenuItem key={index} value={banco}>
                        {Dictionary.banks[banco]}
                      </MenuItem>
                    ))
                    : this.state.dados_cotacao.bancos.map((banco, index) => (
                      <MenuItem key={index} value={banco}>
                        {Dictionary.banks[banco]}
                      </MenuItem>
                    ))} */}
                        </Select>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12} sm={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={
                          this.props.values.frequency
                            ? this.props.values.frequency
                            : ""
                        }
                        aria-label="frequency"
                        name="frequency"
                        className={checkValidateRadios("frequency", this.props)}
                        onChange={handleChange("frequency")}
                        onBlur={this.handleChange}
                        helperText={touched.frequency ? errors.frequency : ""}
                        error={touched.frequency && Boolean(errors.moradia)}
                      >
                        {/* <Grid item xs={12} sm container> */}
                        <Grid item xs={12} sm={12}>
                          <Title text="Envio da" bold="Apólice" />
                          <br />
                          <FormControlLabel
                            value="correio"
                            control={<Radio color="primary" />}
                            label="Correio (Resumo da apólice, cartão do segurado, boletos impressos)"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <FormControlLabel
                            value="email"
                            control={<Radio color="primary" />}
                            label="E-mail(Resumo da apólice, cartão do segurado, boletos digitais)"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <FormControlLabel
                            value="email_correio"
                            control={<Radio color="primary" />}
                            label="Correio + E-mail(Cartão do segurado impresso, e demais documentos digitais)"
                          />
                        </Grid>
                        <Title text="Endereço do" bold="Segurado" />
                        <Grid spacing={3}>
                          <FormGroup row>
                            <Grid item xs={8} sm={6}>
                              <TextField
                                value={
                                  this.state.usuario.cep
                                    ? this.state.usuario.cep
                                    : ""
                                }
                                id="cep"
                                label="CEP"
                                placeholder="00000-000"
                                fullWidth
                                name="cep"
                                // onChange={handleChange}
                                onChange={(e) =>
                                  e.target.value.length == 9
                                    ? this.handleCEP(e)
                                    : ""
                                }
                                helperText={touched.cep ? errors.cep : ""}
                                error={touched.cep && Boolean(errors.cep)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                InputProps={{
                                  inputComponent: textMaskCEP,
                                }}
                              />
                              {this.state.address == false &&
                              this.state.usuario.rua == "" ? (
                                <p class="zip-error">Digite o nome da rua</p>
                              ) : (
                                ""
                              )}
                              {this.state.usuario.cep === undefined && (
                                <p class="zip-error">CEP não encontrado</p>
                              )}
                            </Grid>
                          </FormGroup>
                          <br />

                          <Grid item xs={4} sm={6}>
                            <TextField
                              value={
                                this.props.values.numero
                                  ? this.props.values.numero
                                  : ""
                              }
                              id="numero"
                              name="numero"
                              label="Número"
                              placeholder="Digite aqui"
                              fullWidth
                              onChange={handleChange}
                              onBlur={this.handleChange}
                              helperText={touched.numero ? errors.numero : ""}
                              error={touched.numero && Boolean(errors.numero)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                inputComponent: textMaskNumber,
                              }}
                            />
                          </Grid>
                          {this.state.usuario.rua && (
                            <Grid item xs={12} sm={6}>
                              <div className="results">
                                {this.state.usuario.rua},{" "}
                                {this.state.usuario.bairro} -{" "}
                                {this.state.usuario.cidade}
                              </div>
                            </Grid>
                          )}
                          {/* Se não tiver logradouro abre campo para digitar */}
                          {this.state.address == false &&
                            this.state.usuario.rua == "" && (
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  value={
                                    this.props.values.rua
                                      ? this.props.values.rua
                                      : ""
                                  }
                                  id="rua"
                                  name="rua"
                                  label="Logradouro"
                                  placeholder="Ex: Av, Rua..."
                                  fullWidth
                                  onChange={handleChange}
                                  onBlur={this.handleChange}
                                  helperText={touched.rua ? errors.rua : ""}
                                  error={touched.rua && Boolean(errors.rua)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                            )}
                          {loading && <Loading />}
                          <br />
                          <Grid item xs={12} sm={6}>
                            <TextField
                              value={
                                this.props.values.complemento
                                  ? this.props.values.complemento
                                  : ""
                              }
                              id="complemento"
                              name="complemento"
                              label="Complemento"
                              placeholder="Digite aqui"
                              fullWidth
                              onChange={handleChange}
                              onBlur={this.handleChange}
                              helperText={
                                touched.complemento ? errors.complemento : ""
                              }
                              error={
                                touched.complemento &&
                                Boolean(errors.complemento)
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <div className="actions">
            <Button type="submit" className="btn-next" disabled={isSubmitting}>
              Próximo
            </Button>
          </div>
          <div className="actions mt0">
            <Link className="btn-back" to="/cotacao">
              <KeyboardBackspaceIcon /> Voltar
            </Link>
          </div>
        </Wrapper>
      </>
    );
  }
}
// const sendBdQuali = async (x,y) => {

// };
// const endereco = {
//   cidade: user.cidade,
//   estado: user.estado,
// };
// let client = {
//   nome: user.nome,
//   documento: user.documento,
//   tipoPessoa: "fisica",
//   email: user.email,
//   telefone: null,
//   dataNascimento: new Date(
//     condutorPrincipal.nasc_ano, condutorPrincipal.nasc_mes -1, condutorPrincipal.nasc_dia
//   ).getTime(),
// }
function mapStateToProps(state) {
  return {
    user: state.user.infos,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    adicionaUser: (user) => dispatch(addUser(user)),
    //adicionarLead: () => dispatch(adicionarLeadCotacao()),
    //addLead: (send) => dispatch(postBo('auto/segurado', send))
  };
};

const Form = withFormik({
  mapPropsToValues: ({
    cpf,
    nome,
    email,
    telefone,
    profissao,
    date_birth,
    cidade,
    estado,
    frequency,
    grau_parentesco,
    percentual,
    date_birth_beneficiario,
    marital,
    type_doc,
    numero_doc,
    date_exp,
    rne,
    passaporte,
    pais_emissor,
  }) => {
    return {
      cpf: cpf || "",
      nome: nome || "",
      email: email || "",
      telefone: telefone || "",
      profissao: profissao || "",
      date_birth: date_birth || "",
      cidade: cidade || "",
      estado: estado || "",
      frequency: frequency || "",
      nome: nome || "",
      grau_parentesco: grau_parentesco || "",
      percentual: percentual || "",
      date_exp: percentual || "",
      date_birth_beneficiario: date_birth_beneficiario || "",
      marital: marital || "",
      type_doc: type_doc || "",
      rne: rne || "",
      passaporte: passaporte || "",
      pais_emissor: pais_emissor || "",
      numero_doc: numero_doc || "",

    };
  },

  validationSchema: Yup.object().shape({
    cpf: Yup.string()
      .min(11, "CPF precisa ter no mínimo 11 caracteres")
      //.matches(true, "Not a valid expiration date. Example: MM/YY")
      //.required("CPF é obrigatorio.")
      .test("cpf", "Informe um CPF válido", (value) => {
        return CheckCPF(value);
      }),

    nome: Yup.string()
      .required("Obrigatório")
      .max(200, "Nome é muito longo")
      .test("nome", "Informe um nome válido", (value) => {
        return nameField(value);
      }),
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("E-mail é obrigatório"),
    telefone: Yup.string()
      .min(15, "O telefone deve ter no mínimo 11 dígitos")
      .required("Telefone é obrigatório"),
    estado: Yup.string().required("Estado é obrigatório"),
    // cidade: Yup.string()
    //   .required("Cidade é obrigatório"),
    profissao: Yup.string().required("Profissão é obrigatório"),
    date_birth_beneficiario: Yup.string()
      .required("Data de nascimento é obrigatório")
      .test(
        "date_birth_beneficiario",
        "Informe uma data entre ano de 1920 e a data atual!",
        (value) => {
          let now = new Date();
          now = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
          if (value > now || value < "1920-01-01") return false;
          else return true;
        }
      ),
      // grau_parentesco: Yup.string().required("Grau de parentesco é obrigatório"),
      // percentual: Yup.string().required("Percentual é obrigatório"),
      // marital: Yup.string().required("Estado civil é obrigatório"),
      // type_doc: Yup.string().required("Informar o tipo de documento é obrigatório"),
      // numero_doc: Yup.string().required("Informar o número de documento é obrigatório"),
      // rne: Yup.string().required("Informar o número do RNE é obrigatório"),
      // passaporte: Yup.string().required("Informar no número do passaporte é obrigatório"),
      // pais_emissor: Yup.string().required("País emissor é obrigatório"),
      // frequency: Yup.string().required("Forma do envio da apólice é obrigatório"),

  }),

  handleSubmit: async (
    values,
    { props, setStatus, setValues, setSubmitting }
  ) => {
    localStorage.setItem("@bidu2/user", [JSON.stringify(values)]);
    setStatus(true);
    setSubmitting(false);
  },
})(Questionario);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
