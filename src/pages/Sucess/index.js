import React, { Component } from "react";
import Wrapper from "../../components/wrapper";
import Title from "../../components/Title";
import { Steps } from "../../components/steps";
import { ProductCardSuccess } from "../../components/ProductCardSuccess";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { StepCompleted } from "../../components/StepCompleted";
import { GTM } from "../../helpers";
import { getProposalDHI } from "../../helpers/hdi/proposal";
import Loading from "../../components/loading";
import { createBrowserHistory } from 'history';
const StyledRating = withStyles({
  iconFilled: {
    color: "#00f1e7",
  },
})(Rating);

export class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "2",
      review: false,
      lightbox: false,
      rating: "2",
      loading: false,
      dados_cotacao: JSON.parse(localStorage.getItem("@bidu2/dados_cotacao")),
    };
    this.escExitLightbox = this.escExitLightbox.bind(this);
  }

  handleChangeRating = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.value });
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("CompraFeita_Likert"),
    // });
    /*End Google Tag Manager*/
  };

  BtnLightboxClose = () => {
    this.setState({ lightbox: false });
    this.lightboxBehaviorClose();
  };
  LightboxOutClose = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.setState({ lightbox: false });
      this.lightboxBehaviorClose();
    }
  };
  BtnLightboxOpen = () => {
    this.setState({ lightbox: true });
    this.lightboxBehaviorOpen();
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("CompraFeita_CG"),
    // });
    /*End Google Tag Manager*/
  };

  Proposta = () => {
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("CompraFeita_Proposta"),
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

  sendReview = (event) => {
    event.preventDefault();
    this.setState({ review: true });
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("CompraFeita_EnviarComentario"),
    // });
    /*End Google Tag Manager*/
  };

  escExitLightbox(event) {
    if (event.keyCode === 27) {
      this.lightboxBehaviorClose();
      this.setState({
        lightbox: false,
      });
    }
  }
  componentDidMount() {
    /*Google Tag Manager*/
    // window.dataLayer.push({
    //   event: GTM("CompraFeita"),
    // });
    /*End Google Tag Manager*/

    // var history = createBrowserHistory();
    // window.ga('set', 'page', history.location.pathname + history.location.search);
    // window.ga('send', 'pageview');
    
    window.fbq("track", "Purchase");
    const obj = [];
    document.addEventListener("keydown", this.escExitLightbox, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escExitLightbox, false);
  }

  getProposta() {
    /**
     * O CODIGO ABAIXO ESTAVA COM ERRO DEIXADO PELO EDER
     * EDITADO POR VINICIUS OLIVEIRA 01-09-2020
     * INFELIZMENTE NESSE TESTE O RETORNO DO ARRAY VEIO COM UNDEFINED
     *  const boleto = this.props.location.state.urlPdfBoleto.map((v) => v.length);
     */
    if (this.state.dados_cotacao.susep === 6572) {
      this.props.location.state.uuidHdi &&
        getProposalDHI(
          this.props.location.state.x_track_id,
          this.props.location.state.uuidHdi
        );
    }
    //   this.props.location.state.urlPdfProposta.push( getProposalDHI(
    //     this.props.location.state.x_track_id,
    //     this.props.location.state.uuidHdi
    //   ))
    // // this.props.setValues({
    //   // ...this.props.location.state,
    //   urlPdfProposta: pdfProposta
    // // });
    const proposta = this.props.location.state.urlPdfProposta;
    
    if (proposta.length > 0 && proposta[0] !== undefined) {
      if (proposta[0].length > 0) return true;
      else return false;
    }
    return false;
  }

  getBoleto() {
    /**
     * O CODIGO ABAIXO ESTAVA COM ERRO DEIXADO PELO EDER
     * EDITADO POR VINICIUS OLIVEIRA 01-09-2020
     * INFELIZMENTE NESSE TESTE O RETORNO DO ARRAY VEIO COM UNDEFINED
     *  const boleto = this.props.location.state.urlPdfBoleto.map((v) => v.length);
     */
    const boleto = this.props.location.state.urlPdfBoleto;
    if(boleto[0] != null){
      if (boleto.length > 0 && boleto[0] !== undefined) {
        if (boleto[0].length > 0) return true;
        else return false;
      }
      return false;
    } else return false
  }

  getVistoria() {
    /**
     * O CODIGO ABAIXO ESTAVA COM ERRO DEIXADO PELO EDER
     * EDITADO POR VINICIUS OLIVEIRA 01-09-2020
     * INFELIZMENTE NESSE TESTE O RETORNO DO ARRAY VEIO COM UNDEFINED
     *  const vistoria = this.props.location.state.urlPdfVistoria.map((v) => v.length);
     */

    // console.log(this.props.location.state.urlPdfVistoria)
    const vistoria = this.props.location.state.urlPdfVistoria;
    if (vistoria.length > 0 && vistoria[0] !== undefined) {
      if (vistoria[0].length > 0) return true;
      else return false;
    }
    return false;
  }

  getRastreador() {
    /**
     * O CODIGO ABAIXO ESTAVA COM ERRO DEIXADO PELO EDER
     * EDITADO POR VINICIUS OLIVEIRA 01-09-2020
     * INFELIZMENTE NESSE TESTE O RETORNO DO ARRAY VEIO COM UNDEFINED
     *  const vistoria = this.props.location.state.urlPdfRastreador.map((v) => v.length);
     */

    //console.log(this.props.location.state);
    const rastreador = this.props.location.state.urlPdfRastreador;
    if (rastreador.length > 0 && rastreador[0] !== undefined) {
      if (rastreador[0].length > 0) return true;
      else return false;
    }
    return false;
  }

  render() {
    const { lightbox, review, rating, loading } = this.state;
    return (
      <>
        <Wrapper active={lightbox}>
          <Steps
            step1={true}
            step2={true}
            step3={true}
            step4={true}
            step5={true}
          />
          <div className="page-success">
            <Title bold="Finalizado"></Title>
          </div>
          <ProductCardSuccess />
          <div className="infos txt-center mt1">
            {this.props.location.state.idProposta && (
              <p>
                <span className="bold">Protocolo</span> de Atendimento da Bidu{" "}
                <br />
                <span className="protocol">
                  {this.props.location.state.idProposta}
                </span>
              </p>
            )}
            <p className="mt1">Sua compra foi finalizada com sucesso!</p>
            <p>
              Fique atento ao seus e-mails, você será notificado sobre as
              próximas etapas.
            </p>
          </div>
          {/*           <a
            href="#"
            title="Condições Gerais"
            onClick={() => this.BtnLightboxOpen()}
          >
            <div className="card-button">
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <span className="txt">Condições Gerais</span>
                </Grid>
                <Grid item xs={2} className="txt-right">
                  <div className="icon">
                    <AddIcon />
                  </div>
                </Grid>
              </Grid>
            </div>
          </a> */}

          {this.getBoleto() && (
            <a
              href={this.props.location.state.urlPdfBoleto}
              title="Boleto Bancário"
              onClick={this.Proposta}
              target="blank"
            >
              <div className="card-button">
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <span className="txt">Boleto Bancário</span>
                  </Grid>
                  <Grid item xs={2} className="txt-right">
                    <div className="icon">
                      <ArrowDownwardIcon />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </a>
          )}

          {this.getVistoria() && (
            <a
              href={this.props.location.state.urlPdfVistoria}
              title="Vistoria"
              onClick={this.Proposta}
              target="blank"
            >
              <div className="card-button">
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <span className="txt">Vistoria</span>
                  </Grid>
                  <Grid item xs={2} className="txt-right">
                    <div className="icon">
                      <ArrowDownwardIcon />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </a>
          )}

          {this.getRastreador() && (
            <a
              href={this.props.location.state.urlPdfRastreador}
              title="Rastreador"
              onClick={this.Proposta}
              target="blank"
            >
              <div className="card-button">
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <span className="txt">Rastreador</span>
                  </Grid>
                  <Grid item xs={2} className="txt-right">
                    <div className="icon">
                      <ArrowDownwardIcon />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </a>
          )}

          {this.getProposta() && (
            <a
              id="proposta"
              target="blank"
              href={this.props.location.state.urlPdfProposta}
              title="Proposta"
            >
              <div className="card-button" onClick={this.Proposta}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <span className="txt">Proposta</span>
                  </Grid>
                  <Grid item xs={2} className="txt-right">
                    <div className="icon">
                      <ArrowDownwardIcon />
                    </div>
                  </Grid>
                </Grid>
              </div>

              {loading && <Loading />}
              {/* {this.props.location.state.x_track_id &&
                getProposalDHI(
                  this.props.location.state.x_track_id,
                  this.props.location.state.uuidHdi
                )
              } */}
            </a>
          )}

          {loading && <Loading />}

          {/* {this.props.location.state.x_track_id &&
            getProposalDHI(
              this.props.location.state.x_track_id,
              this.props.location.state.uuidHdi
            )} */}

          {/*           <div className="review">
            {!review ? (
              <>
                <p>
                  <span className="bold">Avaliação</span> <br />O que você achou
                  do nosso serviço?
                </p>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <StyledRating
                    name="rating"
                    defaultValue={2}
                    max={5}
                    value={rating}
                    onChange={this.handleChangeRating("rating")}
                  />
                </Box>
                <div>
                  <span className="bold txt-dark">Comentários</span> <br />
                  <TextareaAutosize
                    aria-label="Nos conte mais sobre o que você achou"
                    rowsMin={5}
                    placeholder="Nos conte mais sobre o que você achou"
                  />
                </div>
                <div className="actions">
                  <a
                    title="Enviar"
                    className="btn-next mt0"
                    onClick={(event) => this.sendReview(event)}
                  >
                    Enviar
                  </a>
                </div>
              </>
            ) : (
              <div className="my1 py1 txt-center bold txt-primary">
                Obrigado por sua avaliação.
              </div>
            )}
          </div> */}
          <div className="my1 pb1 pt1e5 txt-center bold txt-dark">
            Obrigado por comprar conosco!
          </div>
          <figure className="logo-thanks txt-center">
            <img
              alt="Bidu Descomplica"
              src={`${require("../../assets/img/bidu-success.png")}`}
            />
          </figure>
          {lightbox && (
            <div className="lightbox" onClick={this.LightboxOutClose}>
              <div className="content">
                <div className="header-title">
                  <Title bold="Condições gerais"></Title>
                  <div
                    onClick={() => this.BtnLightboxClose()}
                    className="btn-close"
                  >
                    <CloseIcon />
                  </div>
                </div>
                <div className="entry">
                  <p className="subtitle bold">
                    Atenção
                    <br />
                    Mensagem da <strong>*NOME DA SEGURADORA*,</strong>
                    <br />
                    Leia atentamente
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur Protocolo de
                    Atendimento da Bidu adipiscing elit. Maecenas nec mi vitae
                    SUL422289619 sapien tincidunt condimentum quis ut nunc.
                    Suspendisse pulvinar, massa vel tincidunt gravida, lacus
                    metus imperdiet dolor, sed auctor lacus felis in urna. Sua
                    compra foi aliquam finalizada com sucesso! Mauris liquam
                    mauris eget dictum. Nullam at erat sed diam luctus Fique
                    atento id ao sit seus será fermentum amet e-mails, arcu. In
                    você sodales notificado sobre as sit próximas etapas. velit
                    in mi ultrices, amet rutrum urna aliquam. Pellentesque mi
                    metus, congue id magna eu, porttitor vestibulum metus.
                    Aenean efficitur semper est, vel ornare lacus imperdiet
                    vitae. Pellentesque tincidunt justo at ante cursus, ut
                    suscipit risus egestas. Sed in metus sit amet augue
                    malesuada malesuada rhoncus eget libero. Vestibulum dui
                    tellus, sollicitudin eu scelerisque at, fermentum Avalia
                  </p>
                </div>
              </div>
            </div>
          )}
        </Wrapper>
        <StepCompleted bold="Pagamento" />
        <StepCompleted bold="Cotação" />
        <StepCompleted text="Sobre o" bold="veículo" />
        <StepCompleted text="Sobre" bold="você" />
      </>
    );
  }
}
