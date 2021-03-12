import EstadoCivil from './estado_civil'
import InsuredComplementSchooling from './InsuredComplementSchooling'
import occupations from './occupations'
import insuredComplementMonthlyIncome from './insuredComplementMonthlyIncome'
import orgaoExp from './orgaoExpedidor'
const error = "Preenchimento obrigatório"
const inputsForm = [
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
        "name": "politically_exposed",
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