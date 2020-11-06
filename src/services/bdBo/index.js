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
    const url = `${server}/profissao/SP/S%C3%A3o%20Paulo?api-key=${apiKey}`;
    await axios
      .get(url)
      .then(function (res) {
        console.log(res);
        statusProfissao.push(res.data);
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


  // async pesquisarSegurado(cpf) {
  //   let clientes = [];
  //   const url = `${server}/segurado`;
  //   await axios
  //     .post(url, cpf)
  //     .then(function (res) {
  //       console.log(res);
  //       clientes.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return clientes;
  // },
  // async pesquisarCondutor(cpf) {
  //   let clientes = [];
  //   const url = `${server}/condutor/pesquisar`;
  //   await axios
  //     .post(url, cpf)
  //     .then(function (res) {
  //       clientes.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return clientes;
  // },

  // async cadastrarCotacao() {
  //   let idCotacao = [];
  //   const url = `${server}/cotacao/pre_lead`;
  //   await axios
  //     .post(url, {
  //       timeout: 1000,
  //       headers: headers,
  //     })
  //     .then(function (res) {
  //       console.log("cadastrarCotacao - salvo com sucesso");
  //       idCotacao.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idCotacao;
  // },

  // async cadastrarEndereco(params, endereco) {
  //   let idEndereco = [];
  //   const url = `${server}/cotacao/endereco/${params}`;
  //   await axios
  //     .post(url, endereco)
  //     .then(function (res) {
  //       console.log("cadastrarEndereco - salvo com sucesso");
  //       idEndereco.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idEndereco;
  // },
  // async atualizarEndereco(id, params, endereco) {
  //   let idEndereco = [];
  //   const url = `${server}/cotacao/endereco/${id}/${params}`;
  //   await axios
  //     .put(url, endereco)
  //     .then(function (res) {
  //       console.log("atualizado com sucesso");
  //       idEndereco.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idEndereco;
  // },
  // async cadastrarSegurado(params, segurado) {
  //   let idPessoa = [];
  //   const url = `${server}/segurado/${params}`;

  //   await axios
  //     .post(url, segurado)
  //     .then(function (res) {
  //       console.log("Cadastrar Segurado - salvo com sucesso");
  //       console.log(res.data);
  //       idPessoa.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   return idPessoa;
  // },
  // async atualizarSegurado(params, tipo, segurado) {
  //   let idPessoa = [];
  //   const url = `${server}/segurado/${params}/${tipo}`;
  //   await axios
  //     .put(url, segurado)
  //     .then(function (res) {
  //       console.log("atualizarSegurado - atualizado com sucesso");
  //       idPessoa.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idPessoa;
  // },
  // async atualizarCotacao(params, endPoint, putCotacao) {
  //   let resposta = [];
  //   const url = `${server}/cotacao/${params}/${endPoint}`;
  //   await axios
  //     .put(url, putCotacao)
  //     .then(function (res) {
  //       console.log(
  //         " atualizarCotacao - status atualizado para",
  //         putCotacao.status
  //       );
  //       resposta.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return resposta;
  // },
  // async cadastrarVeiculo(veiculo) {
  //   let idVeiculo = [];
  //   const url = `${server}/veiculo`;
  //   await axios
  //     .post(url, veiculo)
  //     .then(function (res) {
  //       console.log("cadastrarVeiculo - salvo com sucesso");
  //       idVeiculo.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idVeiculo;
  // },
  // async infoVeiculo(infoVeiculo) {
  //   let idInfoVeiculo = [];
  //   const url = `${server}/adicional_veiculo`;
  //   await axios
  //     .post(url, infoVeiculo)
  //     .then(function (res) {
  //       console.log(" infoVeiculo - salvo com sucesso");
  //       idInfoVeiculo.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idInfoVeiculo;
  // },
  // async usoVeiculo(usoVeiculo) {
  //   let idUsoVeiculo = [];
  //   const url = `${server}/uso_veiculo`;
  //   await axios
  //     .post(url, usoVeiculo)
  //     .then(function (res) {
  //       console.log("usoVeiculo - salvo com sucesso");
  //       idUsoVeiculo.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idUsoVeiculo;
  // },
  // async apoliceAnterior(apolice) {
  //   let idApoliceAnterior = [];
  //   const url = `${server}/apolice_anterior`;
  //   await axios
  //     .post(url, apolice)
  //     .then(function (res) {
  //       console.log("apoliceAnterior - salvo com sucesso");
  //       idApoliceAnterior.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idApoliceAnterior;
  // },
  // async condutorPrincipal(condutor) {
  //   let idCondutorPrincipal = [];
  //   const url = `${server}/condutor`;
  //   await axios
  //     .post(url, condutor)
  //     .then(function (res) {
  //       console.log("condutorPrincipal - salvo com sucesso");
  //       idCondutorPrincipal.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idCondutorPrincipal;
  // },
  // async atualizarCondutor(params, condutor) {
  //   let idCondutorPrincipal = [];
  //   const url = `${server}/condutor/${params}`;
  //   await axios
  //     .put(url, condutor)
  //     .then(function (res) {
  //       console.log("atualizado com sucesso");
  //       idCondutorPrincipal.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idCondutorPrincipal;
  // },
  // async planoCobertura(planoCobertura) {
  //   let idPlanoCobertra = [];
  //   const url = `${server}/plano_cobertura`;
  //   await axios
  //     .post(url, planoCobertura)
  //     .then(function (res) {
  //       console.log("planoCobertura - salvo com sucesso");
  //       idPlanoCobertra.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idPlanoCobertra;
  // },
  // async requisicao(params, requisicao) {
  //   let idRequisicao = [];
  //   const url = `${server}/requisicao/${params}`;
  //   await axios
  //     .post(url, requisicao)
  //     .then(function (res) {
  //       console.log("requisicao - salvo com sucesso");
  //       idRequisicao.push(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return idRequisicao;
  // },
};

export { apiQualicorp };
