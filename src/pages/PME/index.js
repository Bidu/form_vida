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

import "./PME.css"
import {
  textMaskPhone,
  textMaskNumber,
  textMaskCpf,
  textMaskCEP,
  onlyNumbers,
  CheckCPF,
  onlyLetters,
  nameField,
  CheckCNPJ,
  textMaskCnpj
} from "../../helpers/user";

import { checkValidateRadios } from "../../helpers";
import Loading from "../../components/loading";
import { CadastrarCotacaoBd } from "../../services/bd/CadastrarCotacao";

import { createBrowserHistory } from "history";
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
        date_birth: "",
        nasc_dia: "",
        nasc_mes: "",
        nasc_ano: "",
        genero: "",
        profissao: "",
        escolaridade: "",
        moradia: false,
      },
      dependents: [],
      faixaEtaria: [
       {id:1, desc: '0 a 18 anos'},
       {id: 2, desc: '19 a 23 anos'},
       {id: 3, desc: '24 a 28 anos'},
       {id: 4, desc: '29 a 33 anos'},
       {id: 5, desc: '34 a 38 anos'},
       {id: 6, desc:  '39 a 43 anos'},
       {id: 7, desc: '44 a 48 anos'},
       {id: 8, desc: '49 a 53 anos'},
       {id: 9, desc: '54 a 58 anos'},
       {id: 10, desc:'59 anos ou +'}
      ],
      pessoasPorFaixa: Array.from(new Array(10), (x, i) => i+1),
      pessoasAddFaixaEtaria: [],
      storage: JSON.parse(localStorage.getItem("@bidu2/user")),
    };
    this.handleCEP = this.handleCEP.bind(this);
  }

  async componentDidMount() {
    this.props.values.profissao = "Selecione";

    const storage = JSON.parse(localStorage.getItem("@bidu2/user"));
    delete storage.cep 
    delete storage.entidade 
    delete storage.operadora 
    delete storage.profissao
    delete storage.dependents

    localStorage.setItem("@bidu2/user", JSON.stringify(storage))

    if (storage.length !== 0) {
      this.setState(storage);
      this.props.setValues(storage);
    }
    this.props.setStatus(false);
  }


  handleFaixaEtaria = async (pessoasAddFaixaEtaria, event) =>{
  
   let now = new Date()
   //ANO VALIDO PARA A FAIXA ETARIA ESCOLHIDA
   let year = (now.getFullYear() - (parseInt(pessoasAddFaixaEtaria.desc.substr(0,2)) + 2))
   let date_birth = `${year}-${now.getMonth() + 1}-${now.getDate()}`
  
    

   if( (this.state.pessoasAddFaixaEtaria.filter((e) => e.id == pessoasAddFaixaEtaria.id)).length > 0)
   {
      let deleteItem = this.state.pessoasAddFaixaEtaria.filter((e) => e.id != pessoasAddFaixaEtaria.id)
        
        await this.setState({pessoasAddFaixaEtaria: [...deleteItem , {
                                                                      id: pessoasAddFaixaEtaria.id,
                                                                      desc: pessoasAddFaixaEtaria.desc,
                                                                      qtde: event.target.value,
                                                                      date_birth: date_birth
                                                                    }] })
        
   } else{

     await    this.setState({ pessoasAddFaixaEtaria:
         [...this.state.pessoasAddFaixaEtaria,
         {
           id: pessoasAddFaixaEtaria.id,
           desc: pessoasAddFaixaEtaria.desc,
           qtde: event.target.value,
           date_birth: date_birth
         }
         ]
       })
   }


        

      setTimeout(() => {
        this.props.values.beneficiarios = []
        this.state.pessoasAddFaixaEtaria.map((val) => {
          for (let index = 0; index < val.qtde; index++) {
              this.props.values.beneficiarios = [...this.props.values.beneficiarios, {
                chave: "FUNCIONARIO",
                dataNascimento: val.date_birth
              }]
          }})
      }, 1000);
    
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
          rua: "",
          cidade: "",
          bairro: "",
          estado: "",
          cep: "",
          uf: "",
        },
        loading: false,
      });
      this.props.values.rua = "";
      delete this.props.values.profissao;
    }
  };
  getAddress = async (e) => {
    this.setState({ loading: true });
    let content = await apiQualicorp.endereco(this.state.cep.replace("-", ""));
    console.log(content);
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

  getOccupations = async (address) => {
    this.setState({
      loading: true,
      occupations: [],
      occupationsFalse: true,
    });
    let occupations = await apiQualicorp.publicoAlvo(
      address.estado,
      address.cidade
    );
    if (occupations && occupations.data && occupations.data.length > 0) {
      this.setState({ occupations: occupations.data });
    } else {
      this.setState({
        occupations: [],
        occupationsFalse: false,
      });
    }
  };

  getEntities = async (uf, cidade, profissao) => {
    this.setState({
      loading: true,
      entities: [],
      entitiesFalse: true,
    });

    let entities = await apiQualicorp.entidades(uf, cidade, profissao);

    if (entities && entities.data && entities.data.length > 0) {
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
    
    console.log("Operador", operadoras)

    if (operadoras && operadoras.data && operadoras.data.length > 0) {
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
        this.props.values.uf,
        this.props.values.cidade
      );
    }
    if (event.target.name == "entidade") {
      this.props.values.entidade = event.target.value;
      this.getOperator(
        this.props.values.entidade,
        this.props.values.uf,
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
    console.log("CHEGUEI AQUI")
    // const { usuario } = this.state;
    // this.props.adicionaUser(usuario);
    this.setState({ redirect: true });
  };


  setDependents = (dependents) => {
    this.setState({dependents})
    this.props.values.dependents = dependents;

    console.log(this.state.dependents)
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
    } = this.props;

    if (this.props.status) {
      return <Redirect to="/sucesso" />;
    }

    return (
      <>
        <Wrapper>
          <Steps step1={true} step2={true} />
          <Title text="Plano de" bold="Saúde" />
          <p></p>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.props.values.nome ? this.props.values.nome : ""}
                  type="text"
                  id="nome"
                  name="nome"
                  label="Nome da Empresa"
                  placeholder="Corporation SA"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  value={
                    this.props.values.cnpj ? this.props.values.cnpj : usuario.cnpj
                  }
                  id="cnpj"
                  name="cnpj"
                  label="CNPJ"
                  placeholder="00.000.000/0000-00"
                  fullWidth
                  margin="20px"
                  onChange={handleChange}
                  onBlur={this.handleChange}
                  helperText={touched.cnpj ? errors.cnpj : ""}
                  error={touched.cnpj && Boolean(errors.cnpj)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: textMaskCnpj,
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
                  placeholder="contato@corporation.com"
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
              <Grid item xs={12} sm={6}>
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
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={`${this.state.usuario.rua}, ${this.state.usuario.bairro} - ${this.state.usuario.cidade}/${this.state.usuario.uf} `}
                      id=""
                      label="Endereço"
                      fullWidth
                      name=""
                      disabled
                    />
                  </Grid>
                  {this.state.occupations.length > 0 && (
                    <Grid item xs={12} sm={6}>
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
                        onChange={this.handleChange}
                        helperText={touched.profissao ? errors.profissao : ""}
                        error={touched.profissao && Boolean(errors.profissao)}
                      >
                        <MenuItem value="Selecione" disabled>
                          Selecione
                        </MenuItem>

                        {this.state.occupations.length > 0 &&
                          this.state.occupations.map((e, key) => (
                            <MenuItem value={e.id}>{e.nome}</MenuItem>
                          ))}
                      </Select>
                    </Grid>
                  )}
                  {this.state.occupationsFalse == false && (
                    <DialogAlert
                      title="Ops!"
                      message="Erro ao obter a lista de profissões. Tente novamente mais tarde!"
                    />
                  )}
                  {this.state.entitiesFalse == true && (
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
                    </Grid>
                  )}
                  {this.state.entitiesFalse == false && (
                    <DialogAlert
                      title="Ops!"
                      message="Erro ao obter a lista de entidades. Tente novamente mais tarde!"
                    />
                  )}
                  {this.state.operadorasFalse == true && (
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
                  )}
                </>
              )}

              {loading && <Loading />}
            </Grid>
            <br />
            {this.state.operadorasFalse == true && this.state.operadoras.length > 0 && (
              <>
                <div class="vidas">
                  <Title text="Quantidade de" bold="vidas" />
                </div>
                <div class="texto-vidas">
                  <p>
                    Para quantas pessoas deseja contratar, entre depentes ou
                    funcionários:
                  </p>
                </div>
                <div class="texto-vidas texto-vidas-aviso">
                  <p>
                    Mínimo de 2 pessoas para planos PME*
                  </p>
                </div>
                <div className="grid-faixa-etaria">
                  <Grid container xs={10} spacing={3} >
                    {this.state.faixaEtaria.map((e, key)=>(

                                  <Grid item xs={'2,5'}  key={key}>
                                  <>
                                  <InputLabel shrink id={e.id}>
                                        {e.desc}
                                  </InputLabel>
                                  <TextField
                                    name={e.id}
                                    fullWidth
                                    labelId={e.id}
                                    id={e.id}
                                    type="number"
                                    value={
                                      (this.state.pessoasAddFaixaEtaria.filter((val) => val.id == e.id)).length > 0 ? this.state.pessoasAddFaixaEtaria.filter((val) => val.id == e.id)[0].qtde : ""
                                    }
                                    onChange={ (event) => this.handleFaixaEtaria(e, event)}
                                    onBlur={this.handleChange}
                                    className="select-faixa-etaria"
                                  />
                                     
                                  </>
                                  </Grid>
                    ))}
                      </Grid>
                    </div>
                  
                  
                  </>
                )} 
                <div className="actions">
                      <Button
                        type="submit"
                        className="btn-next"
                        disabled={isSubmitting}
                      >
                        Quero uma cotação
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
    cnpj,
    nome,
    email,
    telefone,
    cep,
    profissao,
    entidade,
    operadora
  }) => {
    return {
      cnpj: cnpj || "",
      nome: nome || "",
      email: email || "",
      telefone: telefone || "",
      cep: cep || "",
      entidade: entidade || "",
      profissao: profissao || "",
      operadora: operadora || "",
    };
  },
  validationSchema: Yup.object().shape({
    cnpj: Yup.string()
      .min(14, "CNPJ precisa ter no mínimo 14 caracteres")
      .test("cnpj", "Informe um CNPJ válido", (value) => {
        if(value == undefined)
          return false
        else
          return CheckCNPJ(value);
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
    entidade: Yup.string().required("Profissão é obrigatório"),
    operadora: Yup.string().required("Profissão é obrigatório"),

  }),


  handleSubmit: async (
    values,
    { props, setStatus, setValues, setSubmitting }
  ) => {
    console.log(values);

    values.date_birth = '1900-01-01'
    localStorage.setItem("@bidu2/user", [JSON.stringify(values)]);
    let cotationSelect = {
      user: values,
      plan: values
    }
    let res = await  apiQualicorp.addLead(cotationSelect)
        
    setInterval(() => {
      if(res.status == 200)
          setStatus(true);  
    }, 3000);
    
    

    setSubmitting(false);
  },
})(About);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
