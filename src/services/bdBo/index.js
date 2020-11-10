import axios from "axios";

//DEV
const server = "https://apisimulador.qualicorp.com.br";
const apiKeyConsultarEndereco = "16935032-593a-4187-8c0e-e30253194e87"
const apiKeyConsultarEntidades = "edbc5aff-6cdd-4045-8871-62eeb5ea89fb"
const apiKeyConsultarProfissao = "dd4d2522-b35b-4cff-9d99-d56cfba5c44f"
const apiKeyConsultarListarPlanos = "d06547cf-dae5-4274-a03b-6a4cdf455bd0"
const apiKeyConsultarSimulacacao = "0df65d77-c63c-46fc-ab10-dae5f8574010"
const apiKeyConsultarInfoAdcionais = "9d675da6-1d85-4f26-91cb-8722feb97089"
const apiKeyConsultarRede = "0f03fd0f-658b-4564-b45e-fa6077d656a6"
const apiKeyConsultarReembolso = "55c14f1e-db71-4562-b2ef-9a9e3e81ac76"
const apiKeyFatorModerador = "2db79cf2-e878-4d09-94ba-623f4f9adcee"




const headers = {
  "Content-Type": "application/json",
};

const apiQualicorp= {
  async consultarEndereco(cep) {
    let statusEndereço = [];
    const url = `${server}/endereco/Enderecos/${cep}?api-key=${apiKeyConsultarEndereco}`;
    await axios
      .get(url)
      .then(function (res) {
        
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
        
        statusProfissao = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusProfissao;
  },

  async consultarEntidade(profissao, uf, cidade) {
    let entidade = [];
    const url = `${server}/entidade/${profissao}/${uf}/${cidade}?api-key=${apiKeyConsultarEntidades}`;
    await axios
      .get(url)
      .then(function (res) {
        entidade = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return entidade;
  },
  async listarPlanos(plano) {
    let planos = [];
    const url = `${server}/plano?api-key=${apiKeyConsultarListarPlanos}`;
    await axios
      .post(url, plano)
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
    const url = `${server}/simulacao?api-key=${apiKeyConsultarSimulacacao}`;
    await axios
      .post(url, simulacao)
      .then(function (res) {
        
        simulacaoAtual.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return simulacaoAtual;
  },

   async consultarIformacoesAdicionais(params) {
    let infoAdd = [];
    const url = `${server}/informacoes-adicionais/${params}/${params}?api-key=${apiKeyConsultarInfoAdcionais}`;
    await axios
      .get(url)
      .then(function (res) {
        
        infoAdd.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return infoAdd;
  },
  async consultarRede(rede) {
    let statusRede = [];
    const url = `${server}/rede-resumida/hospital/${rede}?api-key=${apiKeyConsultarRede}`;
    await axios
      .get(url)
      .then(function (res) {
        
        statusRede.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusRede;
  },
  async consultarReembolso(reembolso) {
    let statusReembolso = [];
    const url = `${server}/reembolso/${reembolso}?api-key=${apiKeyConsultarReembolso}`;
    await axios
      .get(url)
      .then(function (res) {
        
        statusReembolso.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusReembolso;
  },
  async fatorModerador(fator) {
    let statusFatorModerador = [];
    const url = `${server}/fator-moderador/${fator}?api-key=${apiKeyFatorModerador}`;
    await axios
      .get(url)
      .then(function (res) {
        
        statusFatorModerador.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusFatorModerador;
  },
};

export { apiQualicorp };
