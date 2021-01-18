import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../store/actions/user";
import { FormatDocument, DateToTimestamp, GTM } from "../../helpers";
import apiCEP from "../../services/cep/";
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
import axios from "axios";
import DialogDependents from "../../components/DialogDependents";
import Birthday from "../../components/Birthday";
import DialogAlert from "../../components/DialogAlert";
import { bdQuali } from "../../services/bdQuali"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { bruf } from "../../services/bruf";
import TermosUso from '../../components/TermosUso'
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
import "./about.css"

import { checkValidateRadios } from "../../helpers";
import Loading from "../../components/loading";
import { CadastrarCotacaoBd } from "../../services/bd/CadastrarCotacao";

import { createBrowserHistory } from "history";
// import { entities } from "../../helpers/entities";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pratica_esportes: 0,
      loading: false,
      error: false,
      include_sports: 0,
      loading: false,
      error: false,
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
        frequency: false,
        include_sports: 1
      },
      dependents: [],
      storage: JSON.parse(localStorage.getItem("@bidu2/user")),
      estados: [],
      cidades: []
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


    const storage = JSON.parse(localStorage.getItem("@bidu2/user"));

    delete storage.entities
    delete storage.entidade
    delete storage.operadoras
    delete storage.estado
    delete storage.cidade
    delete storage.dependents
    this.props.values.operadoras = []
    localStorage.setItem("@bidu2/user", JSON.stringify(storage))

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
    let occupations = await apiQualicorp.publicoAlvo(
      estado,
      cidade,
    );
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
    this.props.values.operadoras = []
    let entities = await apiQualicorp.entidades(profissao, uf, cidade);

    if (entities && entities.data && entities.data.length > 0) {
      this.props.values.entities = entities.data

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

      let resOperadoras = [operadoras.data.map((v) => {
        return {
          id: v.id,
          name: v.nome,
          entite: entitie
        }
      })]
      this.props.values.operadoras = [...this.props.values.operadoras, resOperadoras[0]]

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
  }



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
    this.setState({ dependents })
    this.props.values.dependents = dependents;

  }



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
      include_sports
    } = this.props;

    if (this.props.status) {
      return <Redirect to="/cotacao" />;
    }

    return (
      <>
        <Wrapper>
          <Steps step1={true} />
          <Title text="Cotação" bold="Seguro de Vida" />
          <p></p>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.cpf ? this.props.values.cpf : usuario.cpf
                  }
                  id="cpf"
                  name="cpf"
                  label="CPF"
                  placeholder="000.000.000-00"
                  fullWidth
                  margin="20px"
                  autoFocus={true}
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.cpf ? errors.cpf : ""}
                  error={touched.cpf && Boolean(errors.cpf)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskCpf,
                    autoComplete: "off",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.props.values.nome ? this.props.values.nome : ""}
                  type="text"
                  id="name"
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

              { }

              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.props.values.email ? this.props.values.email : ""}
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="joao@email.com"
                  fullWidth
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    autoComplete: "off",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.telefone ? this.props.values.telefone : ""
                  }
                  id="phone"
                  name="telefone"
                  label="Celular"
                  placeholder="(00) 00000-0000"
                  fullWidth
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.telefone ? errors.telefone : ""}
                  error={touched.telefone && Boolean(errors.telefone)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskPhone,
                    autoComplete: "off",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Data de nascimento</InputLabel>
                <TextField
                  name="date_birth"
                  id="date_birth"
                  type="date"
                  value={this.props.values.date_birth ? this.props.values.date_birth : ""}
                  onChange={handleChange("date_birth")}
                  onBlur={this.handleChange}
                  helperText={touched.date_birth ? errors.date_birth : ""}
                  error={touched.date_birth && Boolean(errors.date_birth)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <InputLabel shrink id="estado">
                    Estado
              </InputLabel>
                  <Autocomplete

                    id="estado"
                    name="estado"
                    clearOnEscape
                    options={bruf}
                    getOptionLabel={(option) => option.nome}
                    renderInput={(params) => <TextField {...params} style={{ marginTop: 0 }} label="Estado" margin="normal" helperText={touched.estado ? errors.estado : ""}
                      error={touched.estado && Boolean(errors.estado)} />}


                    onChange={(event, newValue,) => {

                      if (newValue && newValue.cidades) {
                        this.props.values.estado = newValue.sigla
                        this.setState({ cidades: newValue.cidades })
                        console.log(newValue.cidades, "ESTADO")
                      }
                      else {
                        this.setState({ cidades: [], occupations: [] })
                        this.props.values.cidade = ""
                      }
                    }}
                    InputProps={{
                      autoComplete: "off",
                    }}
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={3}>
                  <FormControl component="fieldset" className="price-quote"> 
                  <InputLabel shrink id="cidade">
                    Cidade
                  </InputLabel>
                  <Autocomplete
                      
                      id="cidade"
                      name="cidade"
                      clearOnEscape
                      options={this.state.cidades}
                      getOptionLabel={(option) => option}
                      disabled={this.state.cidades.length >  0 ? false : true}
                      renderInput={(params) => <TextField {...params} style={{marginTop:0}} label="Cidade" margin="normal"  helperText={touched.cidade ? errors.cidade : ""}
                      error={touched.cidade && Boolean(errors.cidade)}/>}

                      onChange={(event, newValue) => {
                        if(newValue){
                          this.props.values.cidade = newValue
                          this.getOccupations(this.props.values.estado, this.props.values.cidade)
                        }else{
                          this.setState({ occupations: []})
                          this.props.values.profissao = ""
                        }
                      }
                    }
                    InputProps={{
                      autoComplete: "off",
                    }}
                    />
                  </FormControl>
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  value={this.props.values.cep ? this.props.values.cep : ""}
                  id="cep"
                  label="CEP"
                  placeholder="00000-000"
                  fullWidth
                  name="cep"
                  onChange={handleChange}
                  onKeyUp={(e) => this.handleCEP(e)}
                  // onBlur={(e) => this.handleCEP(e)}
                  helperText={touched.cep ? errors.cep : ""}
                  error={touched.cep && Boolean(errors.cep)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskCEP,
                  }}
                />
                {this.state.usuario.cep === undefined && (
                  <p class="zip-error">CEP não encontrado</p>
                )}
              </Grid>
             
              {this.state.usuario.rua && (
                <> */}
              {/* <Grid item xs={12} sm={6}>
                    <TextField
                      value={`${this.state.usuario.rua}, ${this.state.usuario.bairro} - ${this.state.usuario.cidade}/${this.state.usuario.uf} `}
                      id=""
                      label="Endereço"
                      fullWidth
                      name=""
                      disabled
                    />
                  </Grid> */}
              {/* {this.state.occupations.length > 0 && ( */}
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset" className="price-quote">
                  <InputLabel shrink id="profissao">
                    Profissão
                      </InputLabel>
                  <Autocomplete

                    id="profissao"
                    name="profissao"
                    clearOnEscape
                    options={this.state.occupations}
                    getOptionLabel={(option) => option.nome}
                    disabled={this.state.occupations.length > 0 ? false : true}
                    renderInput={(params) => <TextField {...params} style={{ marginTop: 0 }} label="Profissão" margin="normal" />}
                    onChange={(event, newValue) => {
                      if (newValue) {

                        this.props.values.profissao = newValue.id
                        this.getEntities(
                          this.props.values.profissao,
                          this.props.values.estado,
                          this.props.values.cidade
                        );

                      }
                    }}

                  />
                </FormControl>
              </Grid>

              {/* )} */}
              {/* {this.state.occupationsFalse == false && (
                    <DialogAlert
                      title="Ops!"
                      message="Erro ao obter a lista de profissões. Tente novamente mais tarde!"
                    />
                  )} */}

              {/* <Grid item xs={12} sm={6}>
                      <InputLabel shrink id="gender">
                        Entidades
                      </InputLabel>
                      <Select
                        name="entidade"
                        fullWidth
                        displayEmpty
                        labelId="entidade"
                        disabled={this.state.entities.length >  0 ? false : true}
                        id="entidade"
                        value={
                          this.props.values.entidade
                            ? this.props.values.entidade
                            : "Não informado"
                        }
                        onChange={this.handleChange}
                        // onBlur={this.handleChange}
                        helperText={touched.entidade ? errors.entidade : ""}
                        error={touched.entidade && Boolean(errors.ent)}
                      >
                        <MenuItem value="Selecione" disabled>
                          Selecione
                        </MenuItem>

                        {this.state.entities.length > 0 &&
                          this.state.entities.map((e, key) => (
                            <MenuItem value={e.id}>{e.nome}</MenuItem>
                          ))}
                      </Select>
                    </Grid> */}

              <Grid item xs={12} sm={6}>
                <InputLabel shrink id="gender">
                  Gênero
                </InputLabel>
                <Select
                  name="genero"
                  fullWidth
                  displayEmpty
                  labelId="gender"
                  id="gender"
                  value={
                    this.props.values.genero ? this.props.values.genero : ""
                  }
                  onChange={handleChange("genero")}
                  onBlur={this.handleChange}
                  helperText={touched.genero ? errors.genero : ""}
                  error={touched.genero && Boolean(errors.genero)}
                >
                  <MenuItem value="" disabled>
                    Selecione
                  </MenuItem>
                  <MenuItem value="MASCULINO">Masculino</MenuItem>
                  <MenuItem value="FEMININO">Feminino</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink id="income">
                  Renda Mensal
                </InputLabel>
                <Select
                  name="renda"
                  fullWidth
                  displayEmpty
                  labelId="income"
                  id="income"
                  value={
                    this.props.values.renda ? this.props.values.renda : ""
                  }
                  onChange={handleChange("renda")}
                  onBlur={this.handleChange}
                  helperText={touched.renda ? errors.renda : ""}
                  error={touched.renda && Boolean(errors.renda)}
                >
                  <MenuItem value="" disabled>
                    Selecione a faixa salarial
                  </MenuItem>
                  <MenuItem value="renda1">R$0,00</MenuItem>
                  <MenuItem value="renda2">de R$0,01 até R$1.500,00</MenuItem>
                  <MenuItem value="renda3">de R$1.500,01 até R$ 3.000,00</MenuItem>
                  <MenuItem value="renda4">de R$3.000,01 até R$ 6.000,00</MenuItem>
                  <MenuItem value="renda5">de R$6.000,01 até R$ 10.000,00</MenuItem>
                  <MenuItem value="renda6">acima de R$ 10.000,00</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4} sm={6}>
                <TextField
                  value={
                    this.props.values.capital ? this.props.values.capital : ""
                  }
                  id="capital"
                  name="capital"
                  label="Capital Segurado"
                  placeholder="Ex: 150.000,00"
                  fullWidth
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.capital ? errors.capital : ""}
                  error={touched.capital && Boolean(errors.capital)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    // inputComponent: textMaskNumber,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Data de Vigência</InputLabel>
                <TextField
                  name="date_validity"
                  id="date_validity"
                  type="date"
                  value={this.props.values.date_validity ? this.props.values.date_validity : ""}
                  onChange={handleChange("date_validity")}
                  onBlur={this.handleChange}
                  helperText={touched.date_validity ? errors.date_validity : ""}
                  error={touched.date_validity && Boolean(errors.date_validity)}
                />
              </Grid>

              {/* {this.state.entitiesFalse == false && (
                    <DialogAlert
                      title="Ops!"
                      message="Erro ao obter a lista de entidades. Tente novamente mais tarde!"
                    />
                  )}
                  {/* {this.state.operadorasFalse == true && (
                    <Grid item xs={12} sm={6}>
                      <InputLabel shrink id="gender">
                        Operadora
                      </InputLabel>
                      <Select
                        name="operadora"
                        fullWidth
                        displayEmpty
                        labelId="operadora"
                        id="operadora"
                        value={
                          this.props.values.operadora
                            ? this.props.values.operadora
                            : "Não informado"
                        }
                        onChange={this.handleChange}
                        // onBlur={this.handleChange}
                        helperText={touched.operadora ? errors.operadora : ""}
                        error={touched.operadora && Boolean(errors.ent)}
                      >
                        <MenuItem value="Selecione" disabled>
                          Selecione
                        </MenuItem>
                        
                        {this.state.operadoras &&
                          this.state.operadoras.length > 0 &&
                          this.state.operadoras.map((e, key) => (
                            <MenuItem value={e.nome}>{e.nome}</MenuItem>
                          ))}
                      </Select>
                    </Grid>
                  )} */}
              {/* </> */}
              {/* )} */}
              <Grid item xs={12} sm={12}>
                <Title text="Pratica Esportes" bold="Radicais?" />
                <div className="buttons pb05">
                  <button
                    className={`btn-outline ${this.props.values.pratica_esportes === 1 ? "active" : ""
                      }`}

                    type="button"
                    onClick={
                      this.handleChangeInsurance()
                    }
                  >
                    Sim
                        </button>{" "}
                  <button
                    className={`btn-outline ${this.props.values.pratica_esportes === 0 ? "active" : ""
                      }`}
                    type="button"
                    onClick={
                      this.handleChangeInsuranceFalse()
                    }
                  >
                    Não
                        </button>
                </div>
              </Grid>

              {loading && <Loading />}

              {this.props.values.pratica_esportes === 1 && (
                <Grid item xs={12} sm={6}>
                  <InputLabel shrink id="esportes">
                    Esportes
                  </InputLabel>
                  <Select
                    value={{}}
                    labelId="esportes"
                    id="esportes"
                    name="esportes"
                    fullWidth
                    displayEmpty
                    // onChange={handleChange("esportes")}
                    // onBlur={this.informacaoPagamento}
                    helperText={touched.esportes ? errors.esportes : ""}
                    error={touched.esportes && Boolean(errors.esportes)}
                  >
                    <MenuItem value="000">Selecione</MenuItem>
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
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={
                        this.props.values.frequency ? this.props.values.frequency : ""
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
                          <br />
                          <p>Com que frequência?</p>
                          <FormControlLabel
                            value="frequencia"
                            control={<Radio color="primary" />}
                            label="até 3 vezes no ano"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <FormControlLabel
                            value="frequencia2"
                            control={<Radio color="primary" />}
                            label="acima de 3 vezes no ano"
                          />
                          <br />
                          <br />
                          <p>Deseja incluir outro esporte?</p>
                          <div className="buttons pb05">
                            <button
                              className={`btn-outline ${this.props.values.include_sports === 1 ? "active" : ""
                                }`}

                              type="button"
                              onClick={
                                this.handleChangeInclude()
                              }
                            >
                              Sim
                                  </button>{" "}
                            <button
                              className={`btn-outline ${this.props.values.include_sports === 0 ? "active" : ""
                                }`}
                              type="button"
                              onClick={
                                this.handleChangeIncludefalse()
                              }
                            >
                              Não
                          </button>
                        </div>
                   </Grid>

                        {loading && <Loading />}
                    {/* </Grid> */}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>)
              }
            </Grid>
            <br />


            {/* {
              this.props.values.profissao && this.props.values.profissao.length > 0 &&
              this.props.values.operadoras && this.props.values.operadoras.length > 0 &&
              this.props.values.entities && this.props.values.entities.length > 0 &&
              ( */}
                <>
                  {/* <div class="vidas">
                    <Title text="Quantidade de" bold="vidas" />
                  </div>
                  <div class="texto-vidas">
                    <p>
                      Adicionar dependentes abaixo

                  </p>
                  </div>
                  <div className="actions">
                    <DialogDependents
                      titleName="Adicionar Pessoas"
                      className="bnt-next"
                      setDependents={this.setDependents}
                    />
                  </div> */}




                    <div className="actions about-actions">
                      <Button
                        type="submit"
                        className="btn-next about-btn-next"
                      >
                        Quero uma cotação
                  </Button>                 
                  </div> 
                </>
    
          </form>
          <div className="actions mt0">
            <Link className="btn-back" to="/">
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
    frequency


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
      frequency: frequency || ""

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
    estado: Yup.string()
      .required("Estado é obrigatório"),
    // cidade: Yup.string()
    //   .required("Cidade é obrigatório"),
    profissao: Yup.string().required("Profissão é obrigatório"),
    date_birth: Yup.string()
      .required("Data de nascimento é obrigatório")
      .test("date_birth", "Informe uma data entre ano de 1920 e a data atual!", (value) => {
        let now = new Date()
        now = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        if (value > now || value < "1920-01-01")
          return false
        else
          return true
      })

  }),

  handleSubmit: async (
    values,
    { props, setStatus, setValues, setSubmitting }
  ) => {
    localStorage.setItem("@bidu2/user", [JSON.stringify(values)]);
    setStatus(true);
    setSubmitting(false);
  },
})(About);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
