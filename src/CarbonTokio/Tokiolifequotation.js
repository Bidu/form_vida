import { model } from "./awsService";
const Tokiolifequotation = {
  async translatePayload(dados_cotacao) {
    let amount = dados_cotacao.capital
      .replace("R$ ", "")
      .replace(".", "")
      .replace(",", ".");
      const idCotacao = Math.floor(Math.random() * (10000000000000 - 1 + 1) + 1)
      localStorage.setItem("@bidu2/idCotacao", JSON.stringify(idCotacao))

    const translateQuotation = {
      callbackUrl: `https://cotacao.bidu.com.br/seguros/seguro-vida/quotation/${idCotacao}`,
      bidu: true,
      insured: {
        name: dados_cotacao.nome,
        cpf: dados_cotacao.cpf,
        email: dados_cotacao.email,
        birthDate: dados_cotacao.date_birth,
        gender: dados_cotacao.genero == "FEMININO" ? "FEMALE" : "MALE",
        profession: dados_cotacao.profissao,
        state: dados_cotacao.estado,
      },
      insuredItems: {
        life: {
          termStart: dados_cotacao.date_validity,
          playExtremeSports: false,
          extremeSports: [
            {
              name: dados_cotacao.insurance ? dados_cotacao.esportes : null,
              frequency: dados_cotacao.insurance
                ? dados_cotacao.frequency
                : null,
            },
            dados_cotacao.esportes2 == "Selecione"
              ? false
              : {
                  name: dados_cotacao.esportes2,
                  frequency: dados_cotacao.frequency,
                },
          ],
          insuredAmount: parseInt(amount),
          monthlyIncome: dados_cotacao.renda,
        },
      },
    };
    return translateQuotation;
  },
  async requestAws(quote) {
    const insurer = "tokio-life-quotation"; // here we set the lambda we want to call
    let json = "";
    const data = await model
      .invokeLambda(insurer, quote)
      .then((data) => {
        console.log("SUCESS", data.Payload);
        json = JSON.parse(data.Payload);
        return json;
      })
      .catch((err) => {
        console.log("[ERROR]", err);
      });
    return [json];
  },
};

export { Tokiolifequotation };
