
const dados = JSON.parse(localStorage.getItem("@bidu2/saude/plan"));
const idTransmission = JSON.parse(localStorage.getItem("@bidu2/idCotacao"));
const TokioTransmission = {
  async translateTransmission(dados_transmission) {
    const lifeHiring = {
      bidu: true,
      hiringServices: [
        {
          name: "tokio-life-hiring",
          callbackUrl: `https://cotacao.bidu.com.br/seguros/seguro-vida/transmission/${idTransmission}`,

          quotationProtocolId: dados.quotationResult.protocolId,
          product: dados.quotationResult.product ,
          payment: {
            method: dados.quotationResult.paymentPlans.paymentMode ,
            numberOfInstallments: dados.quotationResult.paymentPlans.numberOfInstallments,
            totalValue: dados.quotationResult.price ,
            pricePerInstallment: dados.quotationResult.paymentPlans.pricePerInstallment,
            contact: {
              email: dados_transmission.email,
              phoneNumber: dados_transmission.telefone,
            },
            bankAccount: {
              bank: dados_transmission.bank ,
              accountType: dados_transmission,
              agency: dados_transmission.agency ,
              agencyDigit: dados_transmission,
              number: dados_transmission.current_account ,
              digit: dados_transmission.digit ,
            },
            payer: {
              name: dados_transmission.name,
              document: dados_transmission.cpf,
            },
            bestPaymentDay: dados_transmission.venciment,
            relationship: dados_transmission.relationship,
            creditcard: dados_transmission.flag,
          },
        },
      ],
      hiringData: {
        insured: {
          name: dados_transmission.nome,
          document: dados_transmission.cpf,
          cpf: dados_transmission.cpf,
          email: dados_transmission.email,
          birthDate: dados_transmission.date_birth,
          gender: dados_transmission.gender,
          profession: dados_transmission.profissao,
          phoneNumber: dados_transmission.telefone,
          complement: {
            maritalStatus: dados_transmission.estado_civil ,
            schooling: dados_transmission.insured_complement_schooling ,
            politicallyExposed: dados_transmission.politically_exposed ,
            dispatchMode: dados_transmission.insured_complement_dispatch_mode,
            foreigner: dados_transmission,
            internationalDocument: {
              rne: null,
              rneNumber: null,
              passportNumber: null,
              passportOrigin: null,
            },
            nationalDocument: {
              source: "SSP",
              number: "27823725",
              emissionDate: "2013-05-24",
            },
          },
          address: {
            zipCode: "78705390",
            state: "MT",
            city: "Rondonópolis",
            district: "Novo Horizonte",
            street: "Rua Patrulheiro José Maciel da Cruz",
            number: "733",
            complement: "",
          },
        },
        insuredItems: {
          life: {
            termStart: dados_transmission,
            playExtremeSports: false,
            extremeSports: [
              {
                name: null,
                frequency: null,
              },
            ],
            insuredAmount: 150000,
            monthlyIncome: "SECOND_RANGE",
            hasBeneficiary: true,
            beneficiaries: [
              {
                name: "LUCAS REGO GEROLIN",
                beneficiaryType: "MARRIED",
                percentage: "60,00",
                birthDate: "1995-05-14",
              },
              {
                name: "MARLI ASSIS DE SOUZA",
                beneficiaryType: "MOTHER",
                percentage: "20,00",
                birthDate: "1968-10-16",
              },
              {
                name: "LUCAS BARBOSA DE SOUZA",
                beneficiaryType: "FATHER",
                percentage: "20,00",
                birthDate: "1968-08-23",
              },
            ],
            healthQuestionnaire: {
              hasDPS: null,
              hasPhysicalConditions: null,
              hasChronicDiseases: null,
              hasSexuallyTransmittedDiseases: null,
              hasMedicationRoutinely: null,
              hasSurgicalTreatmentDiseases: null,
              hasHospitalization: null,
              hasAidsTestDiseases: null,
              hasSpecializedExams: null,
              hasLongTermTreatment: null,
              hasPhysicalDefects: null,
              physicalConditionsValue: null,
              chronicDiseasesValue: null,
              sexuallyTransmittedDiseasesValue: null,
              medicationRoutinelyValue: null,
              surgicalTreatmentDiseasesValue: null,
              hospitalizationValue: null,
              aidsTestDiseasesValue: null,
              aidsTestDiseasesResult: null,
              specializedExamsValue: null,
              longTermTreatmentValue: null,
              physicalDefectsValue: null,
              height: null,
              weight: null,
            },
          },
        },
      },
    };
    return lifeHiring;
  },

export { TokioTransmission };
