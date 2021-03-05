import EstadoCivil from './estado_civil'
import InsuredComplementSchooling from './InsuredComplementSchooling'
import occupations from './occupations'
import insuredComplementMonthlyIncome from './insuredComplementMonthlyIncome'
import orgaoExp from './orgaoExpedidor'
const error = "Preenchimento obrigatório"
const inputsFormDocument = [
    {
        "name": "insured_complement_national_document_source",
        "error": error,
        "label": "Tipo",
        "type": "autocomplete",
        "required": true,
        "options": orgaoExp
    },
    {
        "name": "insured_complement_national_document_number",
        "error": error,
        "label": "Número",
        "type": "text",
        "required": true
    },
    {
        "name": "insured_complement_national_document_emission_date",
        "error": error,
        "label": "Data de expedição",
        "type": "text",
        "mask": "99/99/9999",
        "required": true
    },
    {
        "name": "insured_complement_dispatch_mode",
        "error": error,
        "label": "Envio da apólice",
        "type": "radio",
        "required": true,
        "options": [
                        {
                            "label": "Correio + E-mail (Cartão do Segurado impresso e demais documentos digitais)",
                            "value": "0"
                        },
                        {
                            "label": "E-mail (Resumo da Apólice, cartão do segurado e boleto digitais)",
                            "value": "1"
                        },
                        {
                            "label": "Correio (Resumo da Apólice, cartão do segurado e boleto impressos)",
                            "value": "2"
                        },


                    ]
    },

    {
        "name": "insured_authorize_sms",
        "error": error,
        "label": "Autorizo o envio de informações por SMS",
        "type": "radio",
        "required": true,
        "options": [
                        {
                            "label": "Sim",
                            "value": "yes"
                        },
                        {
                            "label": "Não",
                            "value": "no"
                        },

                    ]
    },
 
           
            
       
    
]

export default inputsFormDocument