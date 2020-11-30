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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withFormik } from "formik";
import * as Yup from "yup";
import * as API from "../../services/bd/CadastrarCotacao";
import { adicionarLeadCotacao } from "../../store/actions/addLeadBd";
import { apiQualicorp } from "../../services/bdBo";
import axios from "axios";
import {
  textMaskPhone,
  textMaskNumber,
  textMaskCpf,
  textMaskCNPJ,
  textMaskCEP,
  onlyNumbers,
  CheckCPF,
  onlyLetters,
  nameField,
} from "../../helpers/user";

import { checkValidateRadios } from "../../helpers";
import Loading from "../../components/loading";
import { CadastrarCotacaoBd } from "../../services/bd/CadastrarCotacao";

import { createBrowserHistory } from "history";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      // request: true,
      //redirect: false,
      cep: "",
      occupations: [],
      possui_cnpj: 1,
      possui_cpf: 0,
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
        nasc_dia: "",
        nasc_mes: "",
        nasc_ano: "",
        genero: "",
        profissao: "",
        escolaridade: "",
        moradia: false,
      },
      storage: JSON.parse(localStorage.getItem("@bidu2/user")),
    };
    this.handleCEP = this.handleCEP.bind(this);
  }

  async componentDidMount() {
    this.props.values.profissao = "Selecione";

    const storage = JSON.parse(localStorage.getItem("@bidu2/user"));

    if (storage.length !== 0) {
      this.setState(storage);
      this.props.setValues(storage);
    }
    this.props.setStatus(false);
  }

  handleCEP = (e) => {
    const cep = e.target.value;
    this.setState({
      cep,
    });
    //if (this.state.cep.length === 8) {
    setTimeout(() => {
      this.getAddress();
    }, 500);
    //}
  };
  getAddress = async (e) => {
    this.setState({ loading: true });
    let content = await apiQualicorp.endereco(this.state.cep.replace("-", ""));
    console.log("OLA", content.data);
    let occupations = await apiQualicorp.publicoAlvo(
      content.data.estado,
      content.data.cidade
    );
    this.setState({ occupations: occupations.data });
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
  };

  handleChange = (event) => {
    this.setState({
      usuario: {
        ...this.state.usuario,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleChangeSwitch = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.checked,
    });
  };
  handleChangeCnpj = (value) => {
    // event.preventDefault();
    this.setState({ possui_cnpj: value });
    console.log(value);
    this.props.setValues({
      ...this.props.values,
      possui_cnpj: value,
    });

    console.log(this.props);
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
    } = this.props;

    if (this.props.status) {
      return <Redirect to="/cotacao" />;
    }

    return (
      <>
        <Wrapper>
          <Steps step1={true} step2={true} />
          <Title text="Você possui" bold="CNPJ?" />
          {/* <p>
            Para preparar a melhor opção de seguro para você, precisamos te
            conhecer um pouco melhor...
          </p> */}
          <form onSubmit={handleSubmit}>
            <FormGroup row>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <div className="buttons pb05">
                    <button
                      className={`btn-outline ${
                        this.state.possui_cnpj == 1 ? "active" : ""
                      }`}
                      value={1}
                      type="button"
                      onClick={(e) => this.handleChangeCnpj(e.target.value)}
                    >
                      Sim
                    </button>{" "}
                    <button
                      className={`btn-outline ${
                        this.state.possui_cnpj == 0 ? "active" : ""
                      }`}
                      value={0}
                      type="button"
                      onClick={(e) => this.handleChangeCnpj(e.target.value)}
                    >
                      Não
                    </button>
                  </div>
                </Grid>
              </Grid>
            </FormGroup>
            {this.state.possui_cnpj == 1 && (
              <div className="buttons-search">
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={
                      this.props.values.possui_cnpj
                        ? this.props.values.possui_cnpj
                        : ""
                    }
                    label="CNPJ"
                    inputProps={{ "aria-label": "possui_cnpj" }}
                    fullWidth
                    id="possui_cnpj"
                    name="possui_cnpj"
                    placeholder="Digite aqui"
                    onChange={handleChange}
                    // onBlur={(e) =>
                    //   e.target.value.length == 7
                    //     ? this.getApiGeneralli(e.target.value)
                    //     : ""
                    // }
                    // onKeyPress={(e) =>
                    //   e.target.value.length == 7
                    //     ? this.getApiGeneralli(e.target.value)
                    //     : ""
                    // }
                    helperText={touched.possui_cnpj ? errors.possui_cnpj : ""}
                    error={touched.possui_cnpj && Boolean(errors.possui_cnpj)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: textMaskCNPJ,
                    }}
                  />
                </Grid>
                <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="ano_fabricacao">
                      Nome
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.ano_fabricacao
                      //     ? this.state.automovel.ano_fabricacao
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="ano_fabricacao"
                      id="ano_fabricacao"
                      name="ano_fabricacao"
                      placeholder="Benedito"
                      // onBlur={handleChange("ano_fabricacao")}
                      // onChange={this.handleAnoFabricacao("ano_fabricacao")}
                      helperText={
                        touched.ano_fabricacao ? errors.ano_fabricacao : ""
                      }
                      error={
                        touched.ano_fabricacao && Boolean(errors.ano_fabricacao)
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="ano_fabricacao">
                      Email
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.ano_fabricacao
                      //     ? this.state.automovel.ano_fabricacao
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="ano_fabricacao"
                      id="ano_fabricacao"
                      name="ano_fabricacao"
                      placeholder="email@email.com"
                      // onBlur={handleChange("ano_fabricacao")}
                      // onChange={this.handleAnoFabricacao("ano_fabricacao")}
                      helperText={
                        touched.ano_fabricacao ? errors.ano_fabricacao : ""
                      }
                      error={
                        touched.ano_fabricacao && Boolean(errors.ano_fabricacao)
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="ano_fabricacao">
                      Celular
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.ano_fabricacao
                      //     ? this.state.automovel.ano_fabricacao
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="ano_fabricacao"
                      id="ano_fabricacao"
                      name="ano_fabricacao"
                      placeholder="(11) 99999-9999"
                      // onBlur={handleChange("ano_fabricacao")}
                      // onChange={this.handleAnoFabricacao("ano_fabricacao")}
                      helperText={
                        touched.ano_fabricacao ? errors.ano_fabricacao : ""
                      }
                      error={
                        touched.ano_fabricacao && Boolean(errors.ano_fabricacao)
                      }
                    ></TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="ano_modelo">
                      CEP
                    </InputLabel>

                    <TextField
                      // value={
                      //   this.state.automovel.ano_modelo
                      //     ? this.state.automovel.ano_modelo
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="ano_modelo"
                      id="ano_modelo"
                      name="ano_modelo"
                      placeholder="00000-000"
                      // onBlur={handleChange("ano_modelo")}
                      // onChange={this.handleChangeFields("ano_modelo")}
                      helperText={touched.ano_modelo ? errors.ano_modelo : ""}
                      error={touched.ano_modelo && Boolean(errors.ano_modelo)}
                    >
                      <MenuItem value="000">Selecione</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="nascimento">
                      Nascimento
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.id_marca
                      //     ? this.state.automovel.id_marca
                      //     : this.props.values.id_marca
                      // }
                      fullWidth
                      displayEmpty
                      labelId="nascimento"
                      id="nascimento"
                      name="id_nascimento"
                      // onBlur={handleChange("id_marca")}
                      // onChange={this.handleChangeMarcas("id_marca")}
                      helperText={
                        touched.id_nascimento ? errors.id_nascimento : ""
                      }
                      error={
                        touched.id_nascimento && Boolean(errors.id_nascimento)
                      }
                      placeholder="00/00/0000"
                    >
                      <MenuItem value="000">Selecione</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="modelo">
                      Profissão
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.id_modelo
                      //     ? this.state.automovel.id_modelo
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="modelo_select"
                      id="modelo_select"
                      placeholder="Atendente"
                      // onChange={this.handleSelectModelo("modelo_select")}
                      // onBlur={handleChange("modelo_select")}
                      helperText={
                        touched.modelo_select ? errors.modelo_select : ""
                      }
                      error={
                        touched.modelo_select && Boolean(errors.modelo_select)
                      }
                    >
                      <MenuItem value="000">Selecione</MenuItem>
                      {/* {modelos &&
                  modelos.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.name}
                    </MenuItem>
                  ))} */}
                    </TextField>
                  </Grid>
                  {this.props.isValid ||
                    (this.props.submitCount > 0 && (
                      <Grid item xs={12} sm={12}>
                        <div className="warning-validation warning-left">
                          <strong>Atenção!</strong>- Preenchimento obrigatório
                          dos campos destacados.
                          <br />
                        </div>
                      </Grid>
                    ))}
                </Grid>
                </>                
              </div>
            )}{" "}
            {this.state.possui_cnpj == 0 ? (
              <>
                <div className="buttons-search">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={
                        this.props.values.possui_cpf
                          ? this.props.values.possui_cpf
                          : ""
                      }
                      label="CPF"
                      inputProps={{ "aria-label": "possui_cpf" }}
                      fullWidth
                      id="possui_cpf"
                      name="possui_cpf"
                      placeholder="Digite aqui"
                      onChange={handleChange}
                      // onBlur={(e) =>
                      //   e.target.value.length == 7
                      //     ? this.getApiGeneralli(e.target.value)
                      //     : ""
                      // }
                      // onKeyPress={(e) =>
                      //   e.target.value.length == 7
                      //     ? this.getApiGeneralli(e.target.value)
                      //     : ""
                      // }
                      helperText={touched.possui_cpf ? errors.possui_cpf : ""}
                      error={touched.possui_cpf && Boolean(errors.possui_cpf)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent: textMaskCpf,
                      }}
                    />
                  </Grid>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="ano_fabricacao">
                      Nome
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.ano_fabricacao
                      //     ? this.state.automovel.ano_fabricacao
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="ano_fabricacao"
                      id="ano_fabricacao"
                      name="ano_fabricacao"
                      placeholder="Benedito"
                      // onBlur={handleChange("ano_fabricacao")}
                      // onChange={this.handleAnoFabricacao("ano_fabricacao")}
                      helperText={
                        touched.ano_fabricacao ? errors.ano_fabricacao : ""
                      }
                      error={
                        touched.ano_fabricacao && Boolean(errors.ano_fabricacao)
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="ano_fabricacao">
                      Email
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.ano_fabricacao
                      //     ? this.state.automovel.ano_fabricacao
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="ano_fabricacao"
                      id="ano_fabricacao"
                      name="ano_fabricacao"
                      placeholder="email@email.com"
                      // onBlur={handleChange("ano_fabricacao")}
                      // onChange={this.handleAnoFabricacao("ano_fabricacao")}
                      helperText={
                        touched.ano_fabricacao ? errors.ano_fabricacao : ""
                      }
                      error={
                        touched.ano_fabricacao && Boolean(errors.ano_fabricacao)
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="ano_fabricacao">
                      Celular
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.ano_fabricacao
                      //     ? this.state.automovel.ano_fabricacao
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="ano_fabricacao"
                      id="ano_fabricacao"
                      name="ano_fabricacao"
                      placeholder="(11) 99999-9999"
                      // onBlur={handleChange("ano_fabricacao")}
                      // onChange={this.handleAnoFabricacao("ano_fabricacao")}
                      helperText={
                        touched.ano_fabricacao ? errors.ano_fabricacao : ""
                      }
                      error={
                        touched.ano_fabricacao && Boolean(errors.ano_fabricacao)
                      }
                    ></TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="ano_modelo">
                      CEP
                    </InputLabel>

                    <TextField
                      // value={
                      //   this.state.automovel.ano_modelo
                      //     ? this.state.automovel.ano_modelo
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="ano_modelo"
                      id="ano_modelo"
                      name="ano_modelo"
                      placeholder="00000-000"
                      // onBlur={handleChange("ano_modelo")}
                      // onChange={this.handleChangeFields("ano_modelo")}
                      helperText={touched.ano_modelo ? errors.ano_modelo : ""}
                      error={touched.ano_modelo && Boolean(errors.ano_modelo)}
                    >
                      <MenuItem value="000">Selecione</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="nascimento">
                      Nascimento
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.id_marca
                      //     ? this.state.automovel.id_marca
                      //     : this.props.values.id_marca
                      // }
                      fullWidth
                      displayEmpty
                      labelId="nascimento"
                      id="nascimento"
                      name="id_nascimento"
                      // onBlur={handleChange("id_marca")}
                      // onChange={this.handleChangeMarcas("id_marca")}
                      helperText={
                        touched.id_nascimento ? errors.id_nascimento : ""
                      }
                      error={
                        touched.id_nascimento && Boolean(errors.id_nascimento)
                      }
                      placeholder="00/00/0000"
                    >
                      <MenuItem value="000">Selecione</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel shrink id="modelo">
                      Profissão
                    </InputLabel>
                    <TextField
                      // value={
                      //   this.state.automovel.id_modelo
                      //     ? this.state.automovel.id_modelo
                      //     : "000"
                      // }
                      fullWidth
                      displayEmpty
                      labelId="modelo_select"
                      id="modelo_select"
                      placeholder="Atendente"
                      // onChange={this.handleSelectModelo("modelo_select")}
                      // onBlur={handleChange("modelo_select")}
                      helperText={
                        touched.modelo_select ? errors.modelo_select : ""
                      }
                      error={
                        touched.modelo_select && Boolean(errors.modelo_select)
                      }
                    >
                      <MenuItem value="000">Selecione</MenuItem>
                      {/* {modelos &&
                  modelos.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.name}
                    </MenuItem>
                  ))} */}
                    </TextField>
                  </Grid>
                  {this.props.isValid ||
                    (this.props.submitCount > 0 && (
                      <Grid item xs={12} sm={12}>
                        <div className="warning-validation warning-left">
                          <strong>Atenção!</strong>- Preenchimento obrigatório
                          dos campos destacados.
                          <br />
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </>
            ) : (
              delete this.props.values.possui_cnpj
            )}
            <div className="actions">
              <Button
                type="submit"
                className="btn-next"
                disabled={isSubmitting}
              >
                QUERO UMA COTAÇÃO
              </Button>
              {/*<Link className="btn-back" to="/">
                <KeyboardBackspaceIcon /> Voltar
              </Link>)*/}
            </div>
          </form>
        </Wrapper>
      </>
    );
  }
}

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
    politicamente_exp,
    email,
    telefone,
    cep,
    complemento,
    profissao,
    numero,
    escolaridade,
    nasc_dia,
    nasc_mes,
    nasc_ano,
    genero,
    moradia,
  }) => {
    return {
      cpf: cpf || "",
      nome: nome || "",
      politicamente_exp: politicamente_exp || "",
      email: email || "",
      telefone: telefone || "",
      cep: cep || "",
      complemento: complemento || "",
      profissao: profissao || "",
      numero: numero || "",
      escolaridade: escolaridade || "",
      nasc_dia: nasc_dia || "",
      nasc_mes: nasc_mes || "",
      nasc_ano: nasc_ano || "",
      genero: genero || "",
      moradia: moradia || "",
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

    cep: Yup.string()
      .required("Cep é obrigatório")
      .min(8, "O CEP deve ter no mínimo 8 dígitos"),
    //complemento: Yup.string().required("Complemento é obrigatório"),
    profissao: Yup.string().required("Profissão é obrigatório"),
    numero: Yup.string().required("Obrigatório"),
    escolaridade: Yup.string().required("Selecione a escolaridade"),
    nasc_dia: Yup.string().required("Selecione o dia"),
    nasc_mes: Yup.string().required("Selecione o mês"),
    nasc_ano: Yup.string().required("Selecione o ano"),
    genero: Yup.string().required("Selecione o gênero"),
    moradia: Yup.string().required("Selecione a moradia"),
  }),

  handleSubmit: async (
    values,
    { props, setStatus, setValues, setSubmitting }
  ) => {
    setTimeout(() => {
      //submit to the server
      //alert(JSON.stringify(values, null, 2));
      props.adicionaUser(values);
      // props.adicionarLead();

      localStorage.setItem("@bidu2/user", [JSON.stringify(values)]);

      setStatus(true);
      window.fbq("track", "Lead");
      setSubmitting(false);
    }, 1000);
    setSubmitting(false);
  },
})(About);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
