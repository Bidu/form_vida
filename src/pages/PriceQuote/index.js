import React, { Component } from "react";
import Wrapper from "../../components/wrapper";
import Title from "../../components/Title";
import { Steps } from "../../components/steps";
import { ListPriceQuotation } from "../../components/ListPriceQuotation";
import { ListPriceQuotationCustom } from "../../components/ListPriceQuotationCustom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CachedIcon from "@material-ui/icons/Cached";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";
import { apiQualicorp } from "../../services/bdBo";
import DialogAlert from '../../components/DialogAlert'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createBrowserHistory } from 'history';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import './priceQuote.css'

export class PriceQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightbox: false,
      loading: false,
      cotacoes: [],
      customQuote: [],
      customQuoteCheck: false,
      filter: false
    };
    this.getCustomQuote = this.getCustomQuote.bind(this);

  }

  getCustomQuote = (customQuote) => {
    this.setState({
      ...this.state,  
      customQuoteCheck: true,
      customQuote,
    });
  };

  getEntities = async (uf, cidade, profissao) => {
    this.setState({
      loading: true,
      entities: [],
      entitiesFalse: true,
    });

    let entities = await apiQualicorp.entidades(uf, cidade, profissao);
   
    if (entities && entities.data && entities.data.length > 0) {
        return entities.data
    } 
  };
  
  getOperator = async (entitie, uf, cidade) => {
    let operadoras = await apiQualicorp.operadoras(uf, cidade, entitie);
    
    if (operadoras && operadoras.data && operadoras.data.length > 0) {
         return operadoras.data
    }
  }


  getCotacoes = async () => {
    this.setState({
      loading: true,
    });

    let user = JSON.parse(localStorage.getItem("@bidu2/user"))

      if(user)
      { 
       
       let cotacoes = []
        let beneficiarios = [
          {
            "chave": user.nome,
            "dataNascimento": user.date_birth
          }
        ] 

        if(user.dependents)
        {
          user.dependents.map((item)=>{
            beneficiarios.push({
              "chave": item.nome,
              "dataNascimento": item.nascimento
            })
          })
        }
    

        await Promise.all(user.operadoras.map(async (entidade) => {
          await Promise.all( entidade.map( async (operadora) => {
            let getPlan = {
          
              "uf": user.uf,
              "cidade": user.cidade ,
              "entidade": operadora.entite,
              "operadora": operadora.name,
              "beneficiarios": beneficiarios
            }
           
           let plans =  await apiQualicorp.listarPlanos(getPlan)
    
           
            if(plans.data.length > 0)
            {
              plans.data.map((item) => {
                cotacoes.push(item)
              })
            }
          }))
        }))
      
        this.setState({cotacoes})
      } 
      // this.sortBy(1)
      this.setState({
        loading: false,
      });
  }


  sortBy = (order) =>{
    this.setState({
      loading: true
    });

    let cotacoes = this.state.cotacoes

    let planosOrder = []

    cotacoes.map((item) => {
        planosOrder.push(item)
    })

    this.setState({filter: order})
    switch (order) {

      case 0:
        
        planosOrder = planosOrder.sort((a, b) => {
          return b.valorTotal - a.valorTotal
        })
        break;
      case 1:
        planosOrder = planosOrder.sort((a, b) => {
          return a.valorTotal - b.valorTotal
        })
        break;
      default:
        break;
      }

 
    cotacoes = planosOrder

    this.setState({cotacoes, loading: false})

  }

  async componentDidMount() {
    
   
    await this.getCotacoes()

    }
   


  OpenChat = (e) => {
    e.preventDefault();
    window.initiateCall(1);

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
  
  
  render() {
    //this.Ordenacao();
    const { loading, cotacoes, customQuote, customQuoteCheck } = this.state;
    return (
      <>
        <Wrapper>
      
          <div className="price-quote">
            <Steps step1={true} step2={true} step3={true} step4={true} step5={true} />
            
            {/* <Title bold="Cotação" idquote={localStorage.getItem("@bidu2/idcotacao")} /> */}
            {<Title bold="Cotação" />} 
          </div>
          <div className="filter">
            <div>
               <FormControl component="fieldset" className="price-quote"> 
               <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Filtros
              </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.filter}
                    onChange={(e) => { this.sortBy(e.target.value) }}
                  >                   
                    <MenuItem value={1}>Menor Preço</MenuItem>
                    <MenuItem value={0}>Maior Preço</MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
              </FormControl>
            </div>
          </div>
        <br />
        {loading &&
                <Loading />}
          {cotacoes.length == 0 && !this.state.loading && (
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

              

              {/*cotacoes.map((c, index) => (
        <div>{this.getValores(JSON.stringify(cotacoes[index]))}</div>
        ))*/}
            
               {cotacoes && cotacoes.length > 0 && cotacoes.map((c, index) => (
                        <>
                          <ListPriceQuotation key={index} quote={c} getQuote={this.getCustomQuote} />
                       </>
               ))} 
               
            </Grid>
            { this.state.cotacoes == false &&
                  
                  <DialogAlert title="Ops!" message="Infelizmente ainda não encontramos um plano de saúde pra você😞!" />
                }
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
            <Link className="btn-back" to="/sobre-voce">
              <KeyboardBackspaceIcon /> Voltar
      </Link>
          </div>
        </Wrapper>
      </>
    );
  }
}