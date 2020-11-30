
import * as React from 'react';
import { Pickers } from '@material-ui/pickers ';
<form className={classes.container} noValidate>
  <TextField
    id="date"
    label="Birthday"
    type="date"
    defaultValue="2017-05-24"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>