import axios from "axios";

//DEV
const server = "https://api-banco-dados-dot-bidu-digital-dev.appspot.com/auto";

//PROD
//const server = "https://api-banco-dados-dot-bidu-digital-prod.rj.r.appspot.com/auto"

const headers = {
  "Content-Type": "application/json",
};

const apiBdBo = {
  async atualizarProposta(cotacao, transmissao) {
    let resposta = [];
    const url = `${server}/proposta/cotacao/${cotacao.idCotacao}/segurado/${cotacao.idPessoa}/veiculo/${cotacao.idVeiculo}/adicional_veiculo/${cotacao.idAdicionalVeiculo}/proposta/${cotacao.postProposta.idProposta}`;
    await axios
      .put(url, transmissao)
      .then(function (res) {
        console.log(res);
        resposta.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return resposta;
  },
  async cadastrarProposta(cotacao, transmissao) {
    console.log("COTACAOOOO", cotacao, transmissao);
    console.log("STRING", JSON.stringify(transmissao));

    let atualProposta = [];
    const url = `${server}/proposta/cotacao/${cotacao.idCotacao}/segurado/${cotacao.idPessoa}/veiculo/${cotacao.idVeiculo}/adicional_veiculo/${cotacao.idAdicionalVeiculo}`;
    await axios
      .post(url, transmissao)
      .then(function (res) {
        console.log(res);
        atualProposta.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return atualProposta;
  },

  async pesquisarProposta(params) {
    let statusProposta = [];
    const url = `${server}/proposta/${params}`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        statusProposta.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return statusProposta;
  },

  async pesquisarCotacao(params) {
    let idLocalStorage = [];
    const url = `${server}/cotacao/${params}`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        idLocalStorage.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idLocalStorage;
  },
  async pesquisarSegurado(cpf) {
    let clientes = [];
    const url = `${server}/segurado`;
    await axios
      .post(url, cpf)
      .then(function (res) {
        console.log(res);
        clientes.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return clientes;
  },
  async pesquisarCondutor(cpf) {
    let clientes = [];
    const url = `${server}/condutor/pesquisar`;
    await axios
      .post(url, cpf)
      .then(function (res) {
        clientes.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return clientes;
  },

  async cadastrarCotacao() {
    let idCotacao = [];
    const url = `${server}/cotacao/pre_lead`;
    await axios
      .post(url, {
        timeout: 1000,
        headers: headers,
      })
      .then(function (res) {
        console.log("cadastrarCotacao - salvo com sucesso");
        idCotacao.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idCotacao;
  },

  async cadastrarEndereco(params, endereco) {
    let idEndereco = [];
    const url = `${server}/cotacao/endereco/${params}`;
    await axios
      .post(url, endereco)
      .then(function (res) {
        console.log("cadastrarEndereco - salvo com sucesso");
        idEndereco.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idEndereco;
  },
  async atualizarEndereco(id, params, endereco) {
    let idEndereco = [];
    const url = `${server}/cotacao/endereco/${id}/${params}`;
    await axios
      .put(url, endereco)
      .then(function (res) {
        console.log("atualizado com sucesso");
        idEndereco.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idEndereco;
  },
  async cadastrarSegurado(params, segurado) {
    let idPessoa = [];
    const url = `${server}/segurado/${params}`;

    await axios
      .post(url, segurado)
      .then(function (res) {
        console.log("Cadastrar Segurado - salvo com sucesso");
        console.log(res.data);
        idPessoa.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return idPessoa;
  },
  async atualizarSegurado(params, tipo, segurado) {
    let idPessoa = [];
    const url = `${server}/segurado/${params}/${tipo}`;
    await axios
      .put(url, segurado)
      .then(function (res) {
        console.log("atualizarSegurado - atualizado com sucesso");
        idPessoa.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idPessoa;
  },
  async atualizarCotacao(params, endPoint, putCotacao) {
    let resposta = [];
    const url = `${server}/cotacao/${params}/${endPoint}`;
    await axios
      .put(url, putCotacao)
      .then(function (res) {
        console.log(
          " atualizarCotacao - status atualizado para",
          putCotacao.status
        );
        resposta.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return resposta;
  },
  async cadastrarVeiculo(veiculo) {
    let idVeiculo = [];
    const url = `${server}/veiculo`;
    await axios
      .post(url, veiculo)
      .then(function (res) {
        console.log("cadastrarVeiculo - salvo com sucesso");
        idVeiculo.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idVeiculo;
  },
  async infoVeiculo(infoVeiculo) {
    let idInfoVeiculo = [];
    const url = `${server}/adicional_veiculo`;
    await axios
      .post(url, infoVeiculo)
      .then(function (res) {
        console.log(" infoVeiculo - salvo com sucesso");
        idInfoVeiculo.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idInfoVeiculo;
  },
  async usoVeiculo(usoVeiculo) {
    let idUsoVeiculo = [];
    const url = `${server}/uso_veiculo`;
    await axios
      .post(url, usoVeiculo)
      .then(function (res) {
        console.log("usoVeiculo - salvo com sucesso");
        idUsoVeiculo.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idUsoVeiculo;
  },
  async apoliceAnterior(apolice) {
    let idApoliceAnterior = [];
    const url = `${server}/apolice_anterior`;
    await axios
      .post(url, apolice)
      .then(function (res) {
        console.log("apoliceAnterior - salvo com sucesso");
        idApoliceAnterior.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idApoliceAnterior;
  },
  async condutorPrincipal(condutor) {
    let idCondutorPrincipal = [];
    const url = `${server}/condutor`;
    await axios
      .post(url, condutor)
      .then(function (res) {
        console.log("condutorPrincipal - salvo com sucesso");
        idCondutorPrincipal.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idCondutorPrincipal;
  },
  async atualizarCondutor(params, condutor) {
    let idCondutorPrincipal = [];
    const url = `${server}/condutor/${params}`;
    await axios
      .put(url, condutor)
      .then(function (res) {
        console.log("atualizado com sucesso");
        idCondutorPrincipal.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idCondutorPrincipal;
  },
  async planoCobertura(planoCobertura) {
    let idPlanoCobertra = [];
    const url = `${server}/plano_cobertura`;
    await axios
      .post(url, planoCobertura)
      .then(function (res) {
        console.log("planoCobertura - salvo com sucesso");
        idPlanoCobertra.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idPlanoCobertra;
  },
  async requisicao(params, requisicao) {
    let idRequisicao = [];
    const url = `${server}/requisicao/${params}`;
    await axios
      .post(url, requisicao)
      .then(function (res) {
        console.log("requisicao - salvo com sucesso");
        idRequisicao.push(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return idRequisicao;
  },
};

export { apiBdBo };
