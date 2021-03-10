import banks from './banks';
import relantionship from './relantionship';
import days from './days'
// import relantionships from "../../helpers/relationships";
const error = "Preenchimento obrigatório"
const inputsForm = [
    {
        "name": "parcels",
        "error": error,
        "label": "Parcelas",
        "type": "autocomplete",
        "required": true,
        "options": banks, 
    },
    {
        "name": "bank",
        "error": error,
        "label": "Banco",
        "type": "autocomplete",
        "required": true,
        "options": banks, 
    },
    {
        "name": "agency",
        "label": "Agência",
        "error": error,
        "type": "text",
        "mask": "9999",
        "placeholder": "0000",
        "required": true,
        "test": "agência"
    },
    {
        "name": "digit",
        "label": "Digio",
        "error": error,
        "type": "text",
        "mask": "9",
        "placeholder": "0",
        "required": true,
        "test": "dígito"
    },
    {
        "name": "current_account",
        "label": "Conta Corrente",
        "error": error,
        "type": "text",
        "mask": "99.999",
        "placeholder": "00.000",
        "required": true,
        "test": "conta corrente"
    },
    {
        "name": "digit",
        "label": "Digio",
        "error": error,
        "type": "text",
        "mask": "9",
        "placeholder": "0",
        "required": true,
        "test": "dígito"
    },
    {
        "name": "venciment",
        "error": error,
        "label": "Vencimento",
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

    {
        "name": "relationship",
        "error": error,
        "label": "Relação do titular da conta com segurado",
        "type": "autocomplete",
        "required": true,
        "options": relantionship, 
    },
    {
        "name": "name",
        "label": "Nome completo do titular da conta",
        "error": error,
        "type": "text",
        "placeholder": "João da Silva",
        "required": true,
        "test": "nome completo"
    },

    {
        "name": "cpf",
        "label": "CPF do titular da conta",
        "error": error,
        "type": "text",
        "mask": "999.999.999-99",
        "placeholder": "000.000.000-00",
        "required": true,
        "test": "cpf"
    },
    
]

export default inputsForm