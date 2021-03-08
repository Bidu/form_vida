// import { i18n } from 'src/i18n';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from './formErrors';
// import AsyncSelect from 'react-select/async';
// import {
//   components as materialUiComponents,
//   styles as materialUiStyles,
// } from 'src/view/shared/form/items/shared/reactSelectMaterialUi';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputLabel, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormContext } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import './AutoCompleteFormItem.css'
const AUTOCOMPLETE_SERVER_FETCH_SIZE = 100;

const useStyles = makeStyles();

function AutocompleteFormItem(props) {
  const {
    errors,
    watch,
    setValue,
    register,
    formState: { touched, isSubmitted },
  } = useFormContext();

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

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const originalValue = watch(name);

  const value = () => {
    const { mode } = props;
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    const { mapper } = props;

    if (originalValue) {
      return originalValue.map((value) =>
        mapper.toAutocomplete(value),
      );
    }

    return [];
  };

  const valueOne = () => {
    const { mapper } = props;

    if (originalValue) {
      return mapper.toAutocomplete(originalValue);
    }

    return null;
  };

  const handleSelect = (value) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setValue(name, [], { shouldValidate: true });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values.map((value) =>
      mapper.toValue(value),
    );
    setValue(name, newValue, { shouldValidate: true });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (value) => {
    if (!value) {
      setValue(name, null, { shouldValidate: true });
      props.onChange && props.onChange(null);
      return;
    }

    const newValue = mapper.toValue(value);
    setValue(name, newValue, { shouldValidate: true });
    props.onChange && props.onChange(newValue);
  };

  const handleSearch = async (value) => {
    try {
      const results = await fetchFn(
        value,
        AUTOCOMPLETE_SERVER_FETCH_SIZE,
      );

      return results.map((result) =>
        mapper.toAutocomplete(result),
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const classes = useStyles();

  const controlStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      marginTop: '0',
      marginBottom: '0',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: errorMessage ? 'red' : undefined,
    }),
  };

  return (
    <>
         {/* <InputLabel>{label}</InputLabel> */}
        <Autocomplete
          id={name}
          name={name}
          options={options}
          fullWidth
         
          // margin="normal"
          getOptionLabel={ (option) => option.label }
          renderInput={(params) => <TextField {...params} label={label}  required={required}
            value={(e) => e.target.value}
            // margin="normal"
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: <InputAdornment position="start"></InputAdornment>
              // endAdornment: (
              //   <React.Fragment>
              //     {load ? <CircularProgress color="inherit" size={20} /> : null}
              //     {params.InputProps.endAdornment}
              //   </React.Fragment>
              // ),
            }}
            fullWidth
            error={Boolean(errorMessage)}
            helperText={errorMessage || hint}
            
          />}
          onChange={(event, newValue) => {
           setValue(name, JSON.stringify(newValue))
          }}
        />

      {props.showCreate && props.hasPermissionToCreate ? (
        <IconButton
          style={{
            marginLeft: '16px',
            marginTop: '16px',
            marginBottom: '8px',
            flexShrink: 0,
          }}
          color="secondary"
          onClick={props.onOpenModal}
        >
          <AddIcon />
        </IconButton>
      ) : null}
    </>
  );
}

AutocompleteFormItem.defaultProps = {
  isClearable: true,
  mode: 'default',
  required: false,
};

AutocompleteFormItem.propTypes = {
  fetchFn: PropTypes.func.isRequired,
  mapper: PropTypes.object.isRequired,
  required: PropTypes.bool,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  showCreate: PropTypes.bool,
  hasPermissionToCreate: PropTypes.bool,
  onChange: PropTypes.func,
};

export default AutocompleteFormItem;
