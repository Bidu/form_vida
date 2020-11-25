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

const useStyles = makeStyles({
    btn:{
        background: '#00FEFD',
        color: '#fff',
        borderRadius: "60px",       
    },
    dialogo:{
      width: "100%"
    }

})

export default function DialogDependents(props) {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            id="name"
            type="text"
            fullWidth
          />
          </DialogContent>
          <DialogContent>
          <InputLabel>Data de nascimento *</InputLabel>
           <TextField
            margin="dense"
            id="name"
            type="date"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}