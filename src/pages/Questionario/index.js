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
import "./questionario.css"

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
        include_sports: 1,
        frequency: false
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
          <Steps step1={true} step2={true} step3={true}  />
          <Title text="Dados do" bold="Beneficiário" /> 
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
              <p>Gostaria de identificar um Beneficiário?</p>
              {loading && <Loading />}
                <FormGroup row>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <div className="buttons pb05">
                        <button
                          className={`btn-outline ${
                            this.state.include_recipient == 1 ? "active" : ""
                          }`}
                          value={1}
                          type="button"
                          onClick={(e) =>
                            this.handleChangePlate(e.target.value)
                          }
                        >
                          Sim
                        </button>{" "}
                        <button
                          className={`btn-outline ${
                            this.state.include_recipient == 0 ? "active" : ""
                          }`}
                          value={0}
                          type="button"
                          onClick={(e) =>
                            this.handleChangePlate(e.target.value)
                          }
                        >
                          Não
                        </button>
                      </div>
                    </Grid>
                  </Grid>
                </FormGroup>
                {/* INPUT DO BENEFICARIO*/}
                <Title text="Dados" bold="Complementares" />
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
                  <MenuItem value="EDUCACAO_PRIMARIA">
                    Ensino Fundamental
                  </MenuItem>
                  <MenuItem value="ENSINO_MEDIO">Ensino Médio</MenuItem>
                  <MenuItem value="ENSINO_MEDIO_TECNICO">
                    Ensino Técnico
                  </MenuItem>
                  <MenuItem value="ENSINO_SUPERIOR">Ensino Superior</MenuItem>
                  <MenuItem value="ENSINO_SUPERIOR_TECNOLOGO">
                    Ensino Superior Tecnólogo
                  </MenuItem>
                  <MenuItem value="POS_GRADUACAO">Pós-graduação</MenuItem>
                  <MenuItem value="MESTRADO">Mestrado</MenuItem>
                  <MenuItem value=">DOUTORADO">Doutorado</MenuItem>
                  <MenuItem value="POS_DOUTORADO">Pós Doutorado</MenuItem>
                </Select>
                <br />
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
                  <MenuItem value="SOLTEIRO">Solteiro</MenuItem>
                  <MenuItem value="CASADO">Casado</MenuItem>
                  <MenuItem value="DIVORCIADO">Divorciado</MenuItem>
                  <MenuItem value="SEPARADO">Separado judicialmente</MenuItem>
                  <MenuItem value="VIUVO">Viúvo</MenuItem>
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
              <Grid container spacing={3}>
              <Title text="Documento do" bold="Segurado" /> 
              <br />
              <br />              
              <Grid item xs={12} sm={12}>
                  <InputLabel shrink id="type_doc">
                    Tipo do Documento
                  </InputLabel>
                  <Select
                    value={{}}
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
                </Grid>
                <br />  
                <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.numero ? this.props.values.numero : ""
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
                />
              </Grid>
              <br />  
              <Grid item xs={6} sm={6}>
                <InputLabel>Data de expedição</InputLabel>
                <TextField
                  name="date_exp"
                  id="date_exp"
                  type="date"
                  value={this.props.values.date_exp ? this.props.values.date_exp : ""}
                  onChange={handleChange("date_exp")}
                  onBlur={this.handleChange}
                  helperText={touched.date_exp ? errors.date_exp : ""}
                  error={touched.date_exp && Boolean(errors.date_exp)}
                />
              </Grid>

  

              { }

                <>

                </>
            </Grid>
          </Grid>
      </Grid>
        </form>
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