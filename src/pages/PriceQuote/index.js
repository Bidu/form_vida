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
import DialogAlert from "../../components/DialogAlert";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { createBrowserHistory } from "history";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Drawer from "../../components/Drawer";
import "./priceQuote.css";
import { Tokiolifequotation } from "../../CarbonTokio/Tokiolifequotation";
import apiBdBo from "../../services/bd/APIBanco"

export class PriceQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightbox: false,
      loading: false,
      cotationAll: [],
      cotationFilter: [],
      payloadSucess: [],
      customQuote: [],
      customQuoteCheck: false,
      filter: false,
      redeReferenciadaHospital: [],
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
      return entities.data;
    }
  };

  getOperator = async (entitie, uf, cidade) => {
    let operadoras = await apiQualicorp.operadoras(uf, cidade, entitie);

    if (operadoras && operadoras.data && operadoras.data.length > 0) {
      return operadoras.data;
    }
  };

  filter = (orderValuePlan = null, hospital = null) => {
    this.sortBy(orderValuePlan, hospital);
  };

  getCotacoes = async () => {
    this.setState({
      loading: true,
    });
      // const valor = JSON.parse(localStorage.getItem("@bidu2/user"));
      // let requestAws = {};
      // const valorAws = await Tokiolifequotation.translatePayload(valor);
      // console.log("OLAAAR", valorAws);
      // requestAws = await Tokiolifequotation.requestAws(valorAws);
      // console.log("CAMILA", requestAws);
      // const payload = requestAws
      // let newPayload = [];
      // if (payload[0].susep == 6190 && payload[0].quotationResult) {
      //   const indexPayload = payload[0].quotationResult.length;
      //   for (let i = 0; i < indexPayload; i++) {
      //     newPayload = [
      //       ...newPayload,
      //       {
      //         communicationStatus: payload[0].communicationStatus,
      //         executionTime: payload[0].executionTime,
      //         susep: payload[0].susep,
      //         error: payload[0].error,
      //         quotationResult: payload[0].quotationResult[i],
      //       },
      //     ];
      //   }
        

      // } else {
      //   newPayload = payload[0]
      // }
      // const data = {
      //   id_cotacao: localStorage.getItem("@bidu2/idCotacao"),
      //   payload: JSON.stringify(newPayload),
      //   status: payload[0].communicationStatus,
      //   product_id: 3
      // }
      // const quotationSave = await apiBdBo.respostaCotacao(data)
      // console.log("NEMPAYLOAD", newPayload)
      // console.log("QUOTATION", quotationSave[0])
      const requestQuotation = await apiBdBo.recuperarCotacao(localStorage.getItem("@bidu2/idCotacao"), 3)
    console.log("REQ", requestQuotation[0].body)
    this.setState({ payloadSucess: requestQuotation[0].body[0], loading:false});


    //   let user = JSON.parse(localStorage.getItem("@bidu2/user"))
    //     if(
    //       user &&
    //       user.cidade != "" &&
    //       user.cpf != "" &&
    //       user.date_birth != "" &&
    //       user.email != "" &&
    //       user.estado != "" &&
    //       user.nome != "" &&
    //       user.entities.length > 0 &&
    //       user.operadoras.length > 0 &&
    //       user.profissao != "" &&
    //       user.telefone != ""
    //        )
    //     {
    //      let cotationAll = []
    //       let beneficiarios = [
    //         {
    //           "chave": user.nome,
    //           "dataNascimento": user.date_birth
    //         }
    //       ]
    //       if(user.dependents)
    //       {
    //         user.dependents.map((item)=>{
    //           beneficiarios.push({
    //             "chave": item.nome,
    //             "dataNascimento": item.nascimento
    //           })
    //         })
    //       }
    //       await Promise.all(user.operadoras.map(async (entidade) => {
    //         await Promise.all( entidade.map( async (operadora) => {
    //           let getPlan = {
    //             "uf": user.estado,
    //             "cidade": user.cidade ,
    //             "entidade": operadora.entite,
    //             "operadora": operadora.name,
    //             "beneficiarios": beneficiarios
    //           }
    //          let plans =  await apiQualicorp.listarPlanos(getPlan)
    //           if(plans && plans.data && plans.data.length > 0)
    //           {
    //             plans.data.map((item) => {
    //               cotationAll.push(item)
    //             })
    //           }
    //         }))
    //       }))
    //       this.setState({cotationAll, cotationFilter: cotationAll})
    //       await this.getRedeReferenciada(cotationAll)
    //     }
    //     // this.sortBy(1)
    //     this.setState({
    //       loading: false,
    //     });
  };

  getRedeReferenciada = async (cotations) => {
    let redeReferenciadaHospital = [];
    let redeReferenciadaLaboratorio = [];

    let res = await Promise.all(
      cotations.map(async (e) => {
        let res = await apiQualicorp.redeReferenciadas(
          e.idProdutoFatura,
          "hospital"
        );
        if (res.status == 200 && res.data && res.data.length > 0) {
          res.data.map((vRedeReferenciada) => {
            let index = redeReferenciadaHospital.findIndex(
              (val) => val.id == vRedeReferenciada.id
            );
            if (index < 0) {
              redeReferenciadaHospital.push({
                id: vRedeReferenciada.id,
                prestador: vRedeReferenciada.prestador,
                tipoPrestador: vRedeReferenciada.tipoPrestador,
                top: vRedeReferenciada.top,
                bairro: vRedeReferenciada.bairro,
                cep: vRedeReferenciada.cep,
                cidade: vRedeReferenciada.cidade,
                endereco: vRedeReferenciada.endereco,
                estado: vRedeReferenciada.estado,
                ddd: vRedeReferenciada.ddd,
                telefone: vRedeReferenciada.telefone,
                tipoAtendimento: [
                  {
                    tipos: vRedeReferenciada.tipoAtendimento,
                    idProdutoFatura: e.idProdutoFatura,
                  },
                ],
                idProdutoFatura: [e.idProdutoFatura],
              });
            } else {
              redeReferenciadaHospital[index].idProdutoFatura.push(
                e.idProdutoFatura
              );
              redeReferenciadaHospital[index].tipoAtendimento.push({
                tipos: vRedeReferenciada.tipoAtendimento,
                idProdutoFatura: e.idProdutoFatura,
              });
            }
          });
          // res.data = [...res.data, {idProdutoFatura: e.idProdutoFatura}]
          // redeReferenciadaHospital = [...redeReferenciadaHospital, res.data]
        }
      })
    );

    if (res) this.setState({ redeReferenciadaHospital });
  };

  sortBy = (order, hospital) => {
    this.setState({
      loading: true,
    });

    let cotationFilter = this.state.cotationAll;

    let planosOrder = [];

    if (hospital != null) {
      let idProdutoFaturaHospitais = [];

      hospital.map((hosp) => {
        hosp.idProdutoFatura.map((prod) => {
          let index = idProdutoFaturaHospitais.findIndex(
            (val) => val.idProdutoFatura == prod
          );
          if (index < 0) {
            idProdutoFaturaHospitais.push({
              idProdutoFatura: prod,
              count: 1,
            });
          } else {
            idProdutoFaturaHospitais[index].count += 1;
          }
        });
      });

      //O MAP ACIMA INSERE EM idProdutoFaturaHospitais QUANTAS VEZES ELE REPETE
      // NA LINHA ABAIXO EU EXTRAIO APENAS OS PRODUTOS QUE TENHAM EM TODOS OS HOSPITAIS, O PRODUTO QUE E ATENDIDO
      // POR UM HOSPITAL E NAO POR OUTRO, É ELIMINADO
      idProdutoFaturaHospitais = idProdutoFaturaHospitais.filter(
        (v) => v.count == hospital.length
      );

      //ABAIXO ELE FILTRA OS PRODUTOS DA COTACAO PARA RENDERIZAR
      idProdutoFaturaHospitais.map((prod) => {
        cotationFilter.map((item) => {
          if (prod.idProdutoFatura == item.idProdutoFatura) {
            let index = planosOrder.findIndex(
              (val) => val.idProdutoFatura == item.idProdutoFatura
            );
            if (index < 0) planosOrder.push(item);
          }
        });
      });

      console.log(idProdutoFaturaHospitais.length, "FILTRO EM HOSP");
      console.log(planosOrder.length, "FILTRO EM COTACAO");
      console.log(this.state.cotationAll.length, "FILTRO EM COTACAO ALL");

      //CODIGO PARA FILTRO DE HOSPITAIS COM ERRO, POIS SELECIONANDO MAIS DE UM HOSPITAL
      //ELE NAO TRAS O PLANO QUE TENHA OS DOIS, APENAS O PLANO QUE TENHA AO MENOS UM DOS HOSPITAIS
      //    hospital.map((hosp) => {
      //   hosp.idProdutoFatura.map((prod)=>{
      //     cotationFilter.map((item) => {
      //         if(prod == item.idProdutoFatura)
      //             {
      //                 let index = planosOrder.findIndex(val => val.idProdutoFatura == item.idProdutoFatura);
      //                 if( index < 0 )
      //                   planosOrder.push(item)
      //             }
      //       })
      //     })
      // })
    } else {
      cotationFilter.map((item) => {
        planosOrder.push(item);
      });
    }

    this.setState({ filter: order });
    switch (order) {
      case "0":
        planosOrder = planosOrder.sort((a, b) => {
          return b.valorTotal - a.valorTotal;
        });
        break;
      case "1":
        planosOrder = planosOrder.sort((a, b) => {
          return a.valorTotal - b.valorTotal;
        });
        break;
      default:
        break;
    }

    cotationFilter = planosOrder;
    this.setState({ cotationFilter, loading: false });
  };

  async componentDidMount() {
    await this.getCotacoes();
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
    const { loading, customQuote, customQuoteCheck } = this.state;
    return (
      <>
        <Wrapper>
          <div className="price-quote">
            <Steps
              step1={true}
              step2={true}
              // step3={true}
              // step4={true}
              // step5={true}
            />
            {!this.state.loading && <Title bold="Cotação" />}
          </div>
          <div className="filter">
            <div>
              <FormControl component="fieldset" className="price-quote">
                <Grid container spacing={2}>
                  {this.state.redeReferenciadaHospital.length > 0 && (
                    <Drawer
                      pushHospital={this.state.redeReferenciadaHospital}
                      filterOrder={(orderValue, hospital) =>
                        this.filter(orderValue, hospital)
                      }
                    />
                  )}

                  <FormHelperText></FormHelperText>
                </Grid>
              </FormControl>
            </div>
          </div>
          <br />
          {loading && <Loading />}
          {this.state.quotationResult == 0 && !this.state.loading && (
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
              {this.state.payloadSucess &&
                this.state.payloadSucess.length > 0 &&
                this.state.payloadSucess.map((c, index) => (
                  <>
                    <ListPriceQuotation
                      key={index}
                      quote={c}
                      getQuote={this.getCustomQuote}
                    />
                  </>
                ))}
            </Grid>
            {this.state.quotationResult == false && !this.state.loading && (
              <DialogAlert
                title="Ops!"
                message="Infelizmente ainda não encontramos um plano de saúde pra você😞!"
              />
            )}
          </div>

          <div className="more-options">
            {/* { !this.state.loading &&
            <p>
              Não encontrou a seguradora que procurava? <br />
              <a href="#" title="" className="primary" onClick={this.OpenChat}>
                Clique aqui e veja mais opções
             </a>
            </p>
            } */}
          </div>
          {!this.state.loading && (
            <div className="actions mt0">
              <Link className="btn-back" to="/sobre-voce">
                <KeyboardBackspaceIcon /> Voltar
              </Link>
            </div>
          )}
        </Wrapper>
      </>
    );
  }
}
