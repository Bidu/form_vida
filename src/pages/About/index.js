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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withFormik } from "formik";
import * as Yup from "yup";
import * as API from "../../services/bd/CadastrarCotacao";
import { adicionarLeadCotacao } from "../../store/actions/addLeadBd";
import { apiQualicorp } from "../../services/bdBo";
import axios from "axios";
import DialogDependents from '../../components/DialogDependents'
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

import { checkValidateRadios } from "../../helpers";
import Loading from "../../components/loading";
import { CadastrarCotacaoBd } from "../../services/bd/CadastrarCotacao";

import { createBrowserHistory } from 'history';
import { entities } from "../../helpers/entities";
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
      entities: [],
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
    let content = await apiQualicorp.endereco(this.state.cep.replace("-", "")) 
    console.log("OLA",content.data)   
    let occupations = await apiQualicorp.publicoAlvo(content.data.estado, content.data.cidade)
    this.setState({occupations:occupations.data})
    let entities = await apiQualicorp.emtidades(content.data.estado, content.data.cidade, content.data.publicoAlvo)
    this.setState({entities:entities.data})
    this.setState({
      usuario: {
        ...this.state.usuario,
        rua: content.data.logradouro,
        cidade: content.data.cidade,
        bairro: content.data.bairro,
        estado: content.data.estado,
        cep: content.data.cep,
        uf: content.data.estado
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
          <Title text="Plano de" bold="Saúde" />
          <p>

          </p>

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
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.cpf ? errors.cpf : ""}
                  error={touched.cpf && Boolean(errors.cpf)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskCpf,
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
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {}

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
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} className="pb0">
                <InputLabel shrink id="birth">
                  Nascimento
                </InputLabel>
              </Grid>
              <Grid item xs={4} className="pt0">
                <Select
                  name="nasc_dia"
                  fullWidth
                  displayEmpty
                  labelId="birth"
                  id="day"
                  value={
                    this.props.values.nasc_dia ? this.props.values.nasc_dia : ""
                  }
                  onChange={handleChange("nasc_dia")}
                  onBlur={this.handleChange}
                  helperText={touched.nasc_dia ? errors.nasc_dia : ""}
                  error={touched.nasc_dia && Boolean(errors.nasc_dia)}
                >
                  <MenuItem value="" disabled>
                    Dia
                  </MenuItem>
                  {dias.map(this.renderDay)}
                </Select>
              </Grid>
              <Grid item xs={4} className="pt0">
                <Select
                  name="nasc_mes"
                  fullWidth
                  displayEmpty
                  labelId="birth"
                  id="month"
                  value={
                    this.props.values.nasc_mes ? this.props.values.nasc_mes : ""
                  }
                  onChange={handleChange("nasc_mes")}
                  onBlur={this.handleChange}
                  helperText={touched.nasc_mes ? errors.nasc_mes : ""}
                  error={touched.nasc_mes && Boolean(errors.nasc_mes)}
                >
                  <MenuItem value="" disabled>
                    Mês
                  </MenuItem>
                  <MenuItem value="01">Janeiro</MenuItem>
                  <MenuItem value="02">Fevereiro</MenuItem>
                  <MenuItem value="03">Março</MenuItem>
                  <MenuItem value="04">Abril</MenuItem>
                  <MenuItem value="05">Maio</MenuItem>
                  <MenuItem value="06">Junho</MenuItem>
                  <MenuItem value="07">Julho</MenuItem>
                  <MenuItem value="08">Agosto</MenuItem>
                  <MenuItem value="09">Setembro</MenuItem>
                  <MenuItem value="10">Outubro</MenuItem>
                  <MenuItem value="11">Novembro</MenuItem>
                  <MenuItem value="12">Dezembro</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4} className="pt0">
                <Select
                  name="nasc_ano"
                  fullWidth
                  displayEmpty
                  labelId="birth"
                  id="year"
                  value={
                    this.props.values.nasc_ano ? this.props.values.nasc_ano : ""
                  }
                  onChange={handleChange("nasc_ano")}
                  onBlur={this.handleChange}
                  helperText={touched.nasc_ano ? errors.nasc_ano : ""}
                  error={touched.nasc_ano && Boolean(errors.nasc_ano)}
                >
                  <MenuItem value="" disabled>
                    Ano
                  </MenuItem>
                  {anos.map(this.renderYear)}
                </Select>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
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
              </Grid>            */}
              <Grid item xs={8} sm={6}>
                <TextField
                  value={this.props.values.cep ? this.props.values.cep : ""}
                  id="cep"
                  label="CEP"
                  placeholder="00000-000"
                  fullWidth
                  name="cep"
                  onChange={handleChange}
                  onBlur={(e) => this.handleCEP(e)}
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
              <Grid item xs={6} sm={6}>
                <InputLabel shrink id="gender">
                  Profissão
                </InputLabel>
                <Select
                  name="profissao"
                  fullWidth
                  displayEmpty
                  labelId="profissao"
                  id="profissao"
                  value={
                    this.props.values.profissao
                      ? this.props.values.profissao
                      : "Não informado"
                  }
                  onChange={handleChange("profissao")}
                  onBlur={this.handleChange}
                  helperText={touched.profissao ? errors.profissao : ""}
                  error={touched.profissao && Boolean(errors.profissao)}
                >
                  <MenuItem value="Selecione" disabled>
                    Selecione
                  </MenuItem>
                  
                  {this.state.occupations.length > 0 && this.state.occupations.map((e, key) => (
                    <MenuItem value={e.id}>{e.nome}</MenuItem>
                  ))}
                </Select>
                </Grid>   
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink id="gender">
                  Entidades
                </InputLabel>
                <Select
                  name="entidade"
                  fullWidth
                  displayEmpty
                  labelId="entidade"
                  id="entidade"
                  value={
                    this.props.values.profissao
                      ? this.props.values.profissao
                      : "Não informado"
                  }
                  onChange={handleChange("entidade")}
                  onBlur={this.handleChange}
                  helperText={touched.entidade? errors.entidade : ""}
                  error={touched.entidade && Boolean(errors.ent)}
                >
                  <MenuItem value="Selecione" disabled>
                    Selecione
                  </MenuItem>
                  
                  {this.state.entities.length > 0 && this.state.entities.map((e, key) => (
                    <MenuItem value={e.id}>{e.nome}</MenuItem>
                  ))}
                </Select>
                </Grid> <br/>
                <h3>
                  Quantidade de Vidas
               </h3>
               <p>Para quantas pessoas deseja contratar, entre depentes ou funcionários</p>
               <div className="actions">
                 <DialogDependents titleName="Adicionar Pessoas" className="bnt-next"/>
               </div>

            <div className="actions">
              <Button
                type="submit"
                className="btn-next"
                disabled={isSubmitting}
              >
                Ver planos
              </Button>
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

  handleSubmit: async (values, { props, setStatus, setValues, setSubmitting }) => {

    
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
