import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormErrors from './formErrors';

import {
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function RadioFormItem(props) {
  const {
    label,
    name,
    hint,
    options,
    externalErrorMessage,
    required,
    row,
    check,
    valueDefined,
    render
    
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    control,
    watch,
  } = useFormContext();

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );



  const formHelperText = errorMessage || hint;

  return (
    render == false || true &&
  
     <Controller
      as={  <FormControl
        required={required}
        error={String(errorMessage)}
        component="fieldset"
        size="small"
      >
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            id={name}
            name={name}
            onChange={(e) => {
              setValue(name, e.target.value, { shouldValidate: true });
              props.onChange && props.onChange(e.target.value);
            }}
            onBlur={(event) => {
              props.onBlur && props.onBlur(event);
            }}
            row={row}
          >
            {options.map((option) => (
           
              <FormControlLabel
                key={option.value}
                value={String(option.value)}
                control={<Radio size="small" checked={check} />}
                label={option.label}
                
              />
            ))}
          </RadioGroup>
          {formHelperText && (
            <FormHelperText style={{ marginTop: 0 }}>
              {formHelperText}
            </FormHelperText>
          )}
        </FormControl>}
      control={control}
      name={name}
    // defaultValue={""}
    />
  
  );
}

RadioFormItem.defaultProps = {
  required: true,
};

RadioFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  externalErrorMessage: PropTypes.string,
  value: true
};

export default RadioFormItem;
