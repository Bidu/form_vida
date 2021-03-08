import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { useForm, useFormContext, Controller } from 'react-hook-form';
import FormErrors from './formErrors';
import InputMask from 'react-input-mask';
import InputAdornment from '@material-ui/core/InputAdornment';
export function InputFormItem(props) {
  // const { register, handleSubmit, control, reset } = useForm();
  const {
    label,
    name,
    hint,
    type,
    placeholder,
    autoFocus,
    autoComplete,
    value,
    required,
    externalErrorMessage,
    disabled,
    endAdornment,
    mask,
  } = props;

  const {
    register,
    setValue,
    getValues,
    control,
    errors,
    formState: { touched, isSubmitted },
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


  return (

    <Controller  
      as={<InputMask mask={mask} maskChar="" 
        // onChange={(event) => {
        //   setForm(event.target.value)
        // }}
        onBlur={(event) => {
          setValue(name, event.target.value)
        }}
        id={name}
        name={name}
        placeholder={placeholder}
      >
        {(inputProps) => <TextField
          {...inputProps}
          type="text"
          label={label}
          required={required}
          placeholder={placeholder}
          // margin="normal"
          autocomplete="off"
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          fullWidth
          error={Boolean(errorMessage)}
          helperText={errorMessage || hint}

        />}
      </InputMask>}
      control={control}
      mask={mask}
     
      maskChar=""
      name={name}
    // defaultValue={""}
    />

  );
}

InputFormItem.defaultProps = {
  type: 'text',
  required: false,
};

InputFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  onChange: PropTypes.func,
  endAdornment: PropTypes.any,
};

export default InputFormItem;
