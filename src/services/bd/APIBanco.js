import axios from "axios";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
} 

// const server = "https://api-banco-dados-dot-bidu-digital-dev.appspot.com/auto";
const server = "http://localhost:8080"
const apiBdBo = {

  async cadastrarSegurado (dados) {
    console.log("DADOS", dados)
    let resposta = [];
    const url = `${server}/segurado/vida`;
    await axios
      .post(url, dados, headers)
      .then(function (res) {
        console.log(res);
        resposta.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return resposta;
  },
  async respostaCotacao(cotacao){
    console.log("ENTREI AQUI")
    let resposta = [];
    const url = `${server}/resposta-cotacao`;
    await axios
      .post(url, cotacao, headers)
      .then(function (res) {
        console.log(res);
        resposta.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return resposta;

  },
  async recuperarCotacao(idCotacao, produto){
    const cotacao = {
      id_cotacao: idCotacao,
      product_id: produto

    }
    let resposta = [];
    const url = `${server}/recuperar-cotacao`;
    await axios
      .post(url, cotacao, headers)
      .then(function (res) {
        console.log(res);
        resposta.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return resposta;

  },



}
export default apiBdBo
