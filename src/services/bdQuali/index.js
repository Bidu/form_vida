// import axios from "axios";
// //DEV
// const server = "https://api-banco-dados-dot-bidu-digital-dev.appspot.com";
// const headers = {
//     "Content-Type": "application/json",
//   };

//   const bdQuali = {
//     async clientInfo(produto) {
//       let idPessoa = [];
//       const url = `${server}/cliente/produto/2`;
//         await axios
//         .post(url, produto)
//         .then(function (res) {
//           console.log("Cadastrar Segurado - salvo com sucesso");
//           console.log(res.data);
//           idPessoa.push(res.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
  
//       return idPessoa;
//     },

//     async clientAdd(produto, status) {
//       let idPessoa = [];
//       const url = `${server}/produto/2/cotacao/pre_lead`;
//         await axios
//         .post(url, produto)
//         .then(function (res) {
//           console.log("Cadastrar Segurado - salvo com sucesso");
//           console.log(res.data);
//           idPessoa.push(res.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
  
//       return idPessoa;
//     },

//     async clientAdress(uso) {
//       let idAdress = [];
//       const url = `${server}/cotacao/endereco/${uso}`;
//         await axios
//         .post(url, uso)
//         .then(function (res) {;
//           console.log(res.data);
//           idAdress.push(res.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
  
//       return idAdress;
//     },
//     async updateAdress(id_endereco) {
//       let resposta = [];
//       const url = `${server}/cotacao/endereco/${id_endereco}/${uso}`;
//       await axios
//         .put(url, id_endereco)
//         .then(function (res) {
//           resposta.push(res.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//       return resposta;
//     },
//     async insuredInfo(produto) {
//       let idInsured = [];
//       const url = `${server}/segurado/${tipo}`;
//         await axios
//         .post(url, produto)
//         .then(function (res) {
//           console.log("Cadastrar Segurado - salvo com sucesso");
//           console.log(res.data);
//           idInsured.push(res.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
  
//       return idPessoa;
//     },
//     async updateIsured(id_segurado) {
//       let respostaIsured = [];
//       const url = `${server}/cotacao/endereco/${id_segurado}/${info}`;
//       await axios
//         .put(url, id_segurado)
//         .then(function (res) {
//           respostaIsured.push(res.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//       return respostaIsured;
//     },

//   };
//   export { bdQuali };