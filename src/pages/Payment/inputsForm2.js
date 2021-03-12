import banks from './banks';
import relantionship from './relantionship';
import days from './days';
import bandeira from './bandeira';

// import relantionships from "../../helpers/relationships";
const error = "Preenchimento obrigatório"
const inputsForm2 = [
    {
        "name": "parcels2",
        "error": error,
        "label": "Parcelas",
        "type": "autocomplete",
        "required": true,
        "options": banks, 
    },
    {
        "name": "flag",
        "error": error,
        "label": "Bandeira",
        "type": "autocomplete",
        "required": true,
        "options": bandeira, 
    },
    {
        "name": "number_card2",
        "label": "Número do Cartão",
        "error": error,
        "type": "text",
        "mask": "9999 9999 9999 9999",
        "placeholder": "0000 0000 0000 0000",
        "required": true,
        "test": "número do cartão"
    },
    {
        "name": "name_titular",
        "label": "Nome do titular do Cartão",
        "error": error,
        "type": "text",
        "placeholder": "João da Silva",
        "required": true,
        "test": "nome do titular"
    },
    {
        "name": "card_expiring_date",
        "label": "Data de Validade do Cartão",
        "error": error,
        "type": "text",
        "mask": "99/99/9999",
        "placeholder": "dd/mm/aaaa",
        "required": true,
        "test": "data de validade"
    },
    {
        "name": "effective_date2",
        "label": "Início da Vigência",
        "error": error,
        "type": "text",
        "mask": "99/99/9999",
        "placeholder": "dd/mm/aaaa",
        "required": true,
        "test": "início da vigência"
    },

    {
        "name": "invoice_day2",
        "error": error,
        "label": "Dia da Fatura",
        "type": "autocomplete",
        "required": true,
        "options": days, 
    },
    {
        "name": "relationship2",
        "error": error,
        "label": "Relação do titular com o segurado",
        "type": "autocomplete",
        "required": true,
        "options": relantionship, 
    },

   
    {
        "name": "name2",
        "label": "Nome completo do titular da conta",
        "error": error,
        "type": "text",
        "placeholder": "João da Silva",
        "required": true,
        "test": "nome completo"
    },

    {
        "name": "cpf2",
        "label": "CPF do titular da conta",
        "error": error,
        "type": "text",
        "mask": "999.999.999-99",
        "placeholder": "000.000.000-00",
        "required": true,
        "test": "cpf"
    },
    
]

export default inputsForm2