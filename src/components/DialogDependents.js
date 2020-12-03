import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/core/styles';
import DataGridTable from './DataGridTable'
const useStyles = makeStyles({
    btn:{
        background: '#00FEFD',
        color: '#001447',
        marginTop: "15px",
        borderRadius: "60px",       
    },
    btnClose:{
      background: '#CCC',
      color: '#001447',
      marginTop: "15px",
      borderRadius: "60px",       
  },

})

export default function DialogDependents(props) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    nome: "",
    nascimento: ""
  })
  
  const [dependents, setDependents] = React.useState([])
  

  const classes = useStyles()

  useEffect(() => {
    
      props.setDependents(dependents)
    
  
  }, [dependents])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addDependent = () => {
    // setDependents.push(form)
    setOpen(false);
  }
  const calcIdade = (ano_aniversario, mes_aniversario, dia_aniversario)  => {
        var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),

        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
}

  const addDependents = async () => {
    console.log(form)
    if(
      form.nome != "" &&
      form.nome != undefined &&
      form.nascimento != "" &&
      form.nascimento != undefined
       ){
          let dtNascimento = new Date(form.nascimento)
          let id = dependents.length + 1
          await setDependents([...dependents, {
            id: id,
            nome: form.nome,
            nascimento: form.nascimento,
            idade: calcIdade(dtNascimento.getFullYear(), dtNascimento.getMonth() + 1, dtNascimento.getDate())
          }])


          setForm({
            nome: "",
            nascimento: ""
          })
          document.querySelector("#nome").focus()
        
        }
        else{
          alert("Nome e data de nascimento são obrigatorias")
        }
  }
  

  const handleInputChange = e => {
    const {name, value} = e.target
      setForm({...form, [name]: value})
}

  const purgeDependents = (obj) =>{
    console.log("delete", obj)
  }

  

  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.btn} onClick={handleClickOpen}>
        {props.titleName}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title" fullWidth={true} maxWidth={'md'} style={{borderRadius: "20px"}}>
        <DialogTitle id="max-width-dialog-title">Preencha as informações abaixo</DialogTitle>
        <DialogContent>
        <InputLabel>Nome *</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            id="nome"
            type="text"
            value={form.nome}
            onChange={handleInputChange}
            onBlur={handleInputChange}
            fullWidth={true}
            maxWidth="lg"
          />
          </DialogContent>
          <DialogContent>
          <InputLabel>Data de nascimento *</InputLabel>
           <TextField
            margin="dense"
            id="nascimento"
            value={form.nascimento}
            name="nascimento"
            type="date"
            fullWidth={true}
            maxWidth="lg"
            onChange={handleInputChange}
            onBlur={handleInputChange}
          />
          <br/>
          {/* 1
          { form }  */}
          <br/>
          { dependents.length > 0 &&
            <DataGridTable rows={dependents} purgeFather={(e) => purgeDependents(e)}/>
          }
         
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  color="primary" className={classes.btnClose}>
            Fechar
          </Button>
          <Button onClick={addDependents} variant="outlined" color="primary" className={classes.btn}>
            Adicionar +
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}