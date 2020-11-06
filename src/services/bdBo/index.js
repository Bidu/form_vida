import axios from "axios";

//DEV
const server = "https://apisimulador.qualicorp.com.br";
const apiKey = "16935032-593a-4187-8c0e-e30253194e87"

//PROD
//const server = "https://api-banco-dados-dot-bidu-digital-prod.rj.r.appspot.com/auto"

const headers = {
  "Content-Type": "application/json",
};

const apiQualicorp= {
  async consultarEndereco(cep) {
    let statusEndereço = [];
    const url = `${server}/endereco/Enderecos/${cep}?api-key=${apiKey}`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        statusEndereço = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusEndereço;
  },

  async consultarProfissao() {
    let statusProfissao = [];
    const url = `${server}/profissao/SP/S%C3%A3o%20Paulo?api-key=dd4d2522-b35b-4cff-9d99-d56cfba5c44f`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        statusProfissao = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusProfissao;
  },

  async listarPlanos(plano) {
    let planos = [];
    const url = `${server}/plano/?api-key=${apiKey}`;
    await axios
      .post(url, {
        timeout: 1000,
        headers: headers,
      })
      .then(function (res) {
        planos.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return planos;
  },
  
  async consultarSimulacacao(simulacao) {
    let simulacaoAtual = [];
    const url = `${server}/simulacao?api-key=${apiKey}`;
    await axios
      .post(url, simulacao)
      .then(function (res) {
        console.log(res);
        simulacaoAtual.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return simulacaoAtual;
  },

   async consultarIformacoesAdicionais(params) {
    let infoAdd = [];
    const url = `${server}/informacoes-adicionais/${params}/${params}?api-key=${apiKey}`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        infoAdd.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return infoAdd;
  },
  async consultarRede(rede) {
    let statusRede = [];
    const url = `${server}/rede-resumida/hospital/${rede}?api-key=${apiKey}`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        statusRede.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusRede;
  },
  async consultarReembolso(reembolso) {
    let statusReembolso = [];
    const url = `${server}/reembolso/${reembolso}?api-key=${apiKey}`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        statusReembolso.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusReembolso;
  },
  async fatorModerador(fator) {
    let statusFatorModerador = [];
    const url = `${server}/fator-moderador/${fator}?api-key=${apiKey}`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        statusFatorModerador.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusFatorModerador;
  },
};

export { apiQualicorp };
