import EstadoCivil from './estado_civil'
import InsuredComplementSchooling from './InsuredComplementSchooling'
import occupations from './occupations'
import insuredComplementMonthlyIncome from './insuredComplementMonthlyIncome'
import orgaoExp from './orgaoExpedidor'
const error = "Preenchimento obrigatório"
const inputsForm = [
    {
        "name": "gender",
        "error": error,
        "label": "Gênero",
        "type": "radio",
        "required": true,
        "options": [
                        {
                            "label": "Masculino",
                            "value": "male"
                        },
                        {
                            "label": "Feminino",
                            "value": "female"
                        },
                       

                    ]
    },
    {
        "name": "estado_civil",
        "error": error,
        "label": "Estado Civil",
        "type": "autocomplete",
        "required": true,
        "options": EstadoCivil
    },
    {
        "name": "insured_complement_schooling",
        "error": error,
        "label": "Escolaridade",
        "type": "autocomplete",
        "required": true,
        "options": InsuredComplementSchooling
    },
    {
        "name": "occupation",
        "error": error,
        "label": "Profissão",
        "type": "autocomplete",
        "required": true,
        "options": occupations
    },
    {
        "name": "residential_proposal_insured_complement_monthly_income",
        "error": error,
        "label": "Faixa de renda mensal",
        "type": "autocomplete",
        "required": true,
        "options": insuredComplementMonthlyIncome
    },
    {
        "name": "residential_proposal_insured_complement_politically_exposed",
        "error": error,
        "label": "Pessoa politicamente exposta?",
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

export default inputsForm