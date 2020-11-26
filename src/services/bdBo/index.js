import axios from "axios";

//DEV
const server = "https://apiceluladigitalhm.qualicorp.com.br";
const apiKeyOperadoras= "1b2f206d-26e9-4fcc-8be6-1c1ed19f00bc";
const apiKeyRedeReferenciadas= "2bb30205-520c-4721-9290-b2dc862b32bf";
const apiKeyFatoresModeradores="2e1b29c8-6153-45dd-af7a-a0eb111c37ab";
const apiKeyEntidades="b5539012-ed84-43f6-96d0-2f59f7bc208f";
const apiKeyPublicoAlvo="f2578d0c-423e-4c9f-8cd9-5b5f8bed946f"; 
const apiKeyInformacoesAdicionaisPorPlano="ddfca8f5-064b-4db6-b3f2-30f27a92d2e4";
const apiKeyCep="b0f0f3ac-a1c2-4f99-882b-8df176ba97c5"; 
const apiKeyPlanos="ddfca8f5-064b-4db6-b3f2-30f27a92d2e4";
const apiKeyPlanosIdPorFatura="ddfca8f5-064b-4db6-b3f2-30f27a92d2e4";




const headers = {
  "Content-Type": "application/json",
};

const apiQualicorp= {
  async operadoras(uf, cidade, entidade) {
    let statusOperadoras = [];
    const url = `${server}/qvenda/operadoras/${entidade}?${uf}&${cidade}&api-key=${apiKeyOperadoras}`
      .get(url)
      .then(function (res) {
        
       statusOperadoras = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusOperadoras;
  },

  async redeReferenciadas(idProdutoFatura, tipo, prestador) {
    let statusRede = [];
    const url = `${server}/qvenda/rede-referenciadas/${idProdutoFatura}/${tipo}/${prestador}?api-key=${apiKeyRedeReferenciadas}`;
    await axios
      .get(url)
      .then(function (res) {
        
        statusRede = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusRede;
  },

  async fatoresModeradores(idProdutoFatura) {
    let statusFatoresModeradores = [];
    const url = `${server}/fatores-moderadores/${idProdutoFatura}?api-key=${apiKeyFatoresModeradores}`;
    await axios
      .get(url)
      .then(function (res) {
        statusFatoresModeradores = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusFatoresModeradores;
  },

  async entidades(publicoAlvo, uf, cidade) {
    let statusEntidades = [];
    const url = `${server}/qvenda/entidades/?publicoAlvo=${publicoAlvo}&uf=${uf}&cidade=${cidade}}&api-key=${apiKeyEntidades}`;
    await axios
      .get(url)
      .then(function (res) {
        statusEntidades = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusEntidades;
  },
  async publicoAlvo(uf, cidade) {
    let statusPublicoAlvo = [];
    const url = `${server}/qvenda/publicos-alvo?uf=${uf}&cidade=${cidade}&api-key=${apiKeyPublicoAlvo}`;
    await axios
      .get(url)
      .then(function (res) {
        statusPublicoAlvo = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusPublicoAlvo;
  }, 
  async informacoesAdicionaisPorPlano(idProdutoFatura) {
    let statusInformacoesAddPlano = [];
    const url = `${server}/qvenda/planos/${idProdutoFatura}/informacoesAdicionais?api-key=${apiKeyInformacoesAdicionaisPorPlano}`;
    await axios
      .get(url)
      .then(function (res) {
        statusInformacoesAddPlano = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusInformacoesAddPlano;
  },
  async endereco(cep) {
    let statusEndereco = [];
    const url = `${server}/qvenda/enderecos/cep/${cep}?api-key=${apiKeyCep}`;
    await axios
      .get(url)
      .then(function (res) {
        statusEndereco = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusEndereco;
  },
  async listarPlanos(plano) {
    let planos = [];
    const url = `${server}/qvenda/planos/lista?api-key=${apiKeyPlanos}`;
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
  
  async planosIdPorFatura(params) {
    let statusPlanosIdPorFatura = [];
    const url = `${server}/qvenda/planos/lista?api-key=${apiKeyPlanosIdPorFatura}`;
    await axios
      .post(url, params)
      .then(function (res) {
        
        statusPlanosIdPorFatura.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusPlanosIdPorFatura;
  },

};

export { apiQualicorp };
