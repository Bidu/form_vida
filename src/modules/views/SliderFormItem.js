import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useFormContext } from 'react-hook-form';
import FormErrors from './formErrors';
const useStyles = makeStyles({
  root: {
    width: "50%",
    paddingTop: "20px"
  },
  input: {
    width: 70,
  },
});

export default function InputSlider(props) {
  const classes = useStyles();
  const [valueSlider, setValueSlider] = React.useState(Number(props.min));

  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    externalErrorMessage,
    mode,
    required,
    isClearable,
    fetchFn,
    mapper,
    options,
    getOptionLabel
  } = props;


  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue
  } = useFormContext();

 
  useEffect(() => {
    register({ name });
    setValue(name,props.min)
  }, [register, name]);

  const handleSliderChange = (event, newValue) => {
    setValueSlider(newValue);
    console.log(props.name)
    setValue(props.name, newValue)

  };

  const handleInputChange = (event) => {
    setValueSlider(event.target.value === '' ? '' : Number(event.target.value));
    setValue(props.name,  Number(event.target.value))
  };

  const handleBlur = () => {
    if (valueSlider < props.min) {
      setValueSlider(props.min);
    } else if (valueSlider > props.max) {
      setValueSlider(props.max);
    }
  };



  return (
    <div className={classes.root}>
        <h3 style={{fontWeight: '500'}}>
            {props.title}
        </h3>
        <h5 style={{fontWeight: '300'}}>
           Valor da Cobertura
        </h5>
      <Grid container spacing={2} alignItems="center">
     
        <Grid item xs style={{padding: 20}}>
          <Slider
            value={typeof valueSlider === 'number' ? valueSlider : 1000}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={props.min}
            max={props.max}
            required={props.required}
            name={props.name}
          />
          
        </Grid>
        <Grid item>
            
            <label>R$</label>
          
        </Grid>
        <Grid item>
            
          <Input
            className={classes.input}
            value={valueSlider}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: props.min,
              max: props.max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}