import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
    dialogo:{
      width: "100%"
    }

})

export default function DialogDependents(props) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    nome: "",
    nascimento: ""
  })
  
  const [dependents, setDependents] = React.useState([])
  

  const classes = useStyles()
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

  const addDependents = () => {

    let dtNascimento = new Date(form.nascimento)
    console.log("dt", dtNascimento)
    let id = dependents.length + 1
    setDependents([...dependents, {
      id: id,
      nome: form.nome,
      nascimento: form.nascimento,
      idade: calcIdade(dtNascimento.getFullYear(), dtNascimento.getMonth() + 1, dtNascimento.getDate())
    }])
  }
  console.log("a", dependents)

  const handleInputChange = e => {
    console.log("teste")
    const {name, value} = e.target
    setForm({...form, [name]: value})

    console.log(form)
}

  

  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.btn} onClick={handleClickOpen}>
        {props.titleName}
      </Button>
      <Dialog open={open} onClose={handleClose} className={classes.dialogo} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Preencha as informações abaixo</DialogTitle>
        <DialogContent>
        <InputLabel>Nome *</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            id="nome"
            type="text"
            value="Vinicius"
            onBlur={handleInputChange}
            fullWidth
          />
          </DialogContent>
          <DialogContent>
          <InputLabel>Data de nascimento *</InputLabel>
           <TextField
            margin="dense"
            id="nascimento"
            name="nascimento"
            type="date"
            fullWidth
            onBlur={handleInputChange}
          />
          <br/>
          {/* 1
          { form }  */}
          <br/>
          { dependents.length > 0 &&
            <DataGridTable rows={dependents}/>
          }
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={addDependent} color="primary">
            Adicionar
          </Button>
          <Button onClick={addDependents} color="primary">
            Adicionar e Adicionar outro
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}