import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
export default function DatePickers() {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="birth"
        label="Nascimento"
        type="date"
        inputProps={{ max: "9999-12-12" }}
        defaultValue="1992-03-06"
        className={classes.textField}
        style={{ marginLeft: "0px" }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
