import banks from './banks';
import relantionship from './relantionship';
import days from './days';
import bandeira from './bandeira';

// import relantionships from "../../helpers/relationships";
const error = "Preenchimento obrigatório"
const inputsForm3 = [
    {
        "name": "parcels",
        "error": error,
        "label": "Parcelas",
        "type": "autocomplete",
        "required": true,
        "options": banks, 
    },
    {
        "name": "invoice_day3",
        "error": error,
        "label": "Melhor data de pagamento do boleto",
        "type": "autocomplete",
        "required": true,
        "options": days, 
    },
    
    {
        "name": "effective_date3",
        "label": "Início da Vigência",
        "error": error,
        "type": "text",
        "mask": "99/99/9999",
        "placeholder": "dd/mm/aaaa",
        "required": true,
        "test": "início da vigência"
    },

    
]

export default inputsForm3