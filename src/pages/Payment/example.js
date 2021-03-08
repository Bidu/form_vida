const error = "Preenchimento obrigatório"
const inputsForm = [
    {
        "name": "name",
        "label": "Nome Completo",
        "error": error,
        "type": "text",
        "placeholder": "João da Silva",
        "required": true,
        "test": "nome completo"
    },
    {
        "name": "date_birth",
        "label": "Data de Nascimento",
        "error": error,
        "type": "text",
        "mask": "99/99/9999",
        "placeholder": "dd/mm/aaaa",
        "required": true,
        "test": "data de nascimento"
    },
    {
        "name": "cpf",
        "label": "CPF",
        "error": error,
        "type": "text",
        "mask": "999.999.999-99",
        "placeholder": "000.000.000-00",
        "required": true,
        "test": "cpf"
    },
    {
        "name": "email",
        "label": "Email",
        "error": error,
        "placeholder": "joao.silva@gmail.com",
        "type": "text",
        "required": true,
    },
    {
        "name": "tel",
        "label": "Telefone",
        "error": error,
        "placeholder": "(00) 0 0000-0000",
        "type": "text",
        "mask": "(99) 9 9999-9999",
        "required": true,
    },
    {
        "name": "obs",
        "label": "Tem alguma observação? Conte para nós! (Opcional)",
        "error": error,
        "type": "text",
        "required": false,
    },
   
           
            
       
    
]

export default inputsForm