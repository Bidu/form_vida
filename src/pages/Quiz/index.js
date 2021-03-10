import React, { useState, useEffect } from "react";
import Wrapper from "../../components/wrapper";
import { Steps } from "../../components/steps";
import Title from "../../components/Title";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import InputFormItem from '../../modules/views/InputFormItem';
import RadioFormItem from '../../modules/views/RadioFormItem';
import MaskFormItem from '../../modules/views/MaskFormItem';
import AutoCompleteFormItem from '../../modules/views/AutoCompleteFormItem';
import yupFormSchemas from '../../modules/yup/yupFormSchemas'
import inputsForm from './inputsForm'
import inputsFormDocument from './inputsFormDocument'
import { Link, Redirect } from "react-router-dom";
import { CircularProgress, TextField, Select, InputLabel, MenuItem, Grid, Radio, RadioGroup, FormControl, FormControlLabel, Button, Divider, Checkbox } from "@material-ui/core"
import Loading from "../../components/loading";


const formValidation = () => {
  let objetivo = []
  let elemento = []
  inputsForm.map((e, key) => {
    if (e.test)
      objetivo.push({ [e.name]: yupFormSchemas.string(`${e.error}`, { required: e.required, test: e.test }) })
    else
      objetivo.push({ [e.name]: yupFormSchemas.string(`${e.error}`, { required: e.required }) })

  })
  inputsFormDocument.map((e, key) => {
    if (e.test)
      objetivo.push({ [e.name]: yupFormSchemas.string(`${e.error}`, { required: e.required, test: e.test }) })
    else
      objetivo.push({ [e.name]: yupFormSchemas.string(`${e.error}`, { required: e.required }) })

  })
  for (let index = 0; index < objetivo.length; index++) {
    elemento = { ...elemento, ...objetivo[index] };

  }

  return elemento
}


const schema = yup.object().shape(
  formValidation()
);



const formatStringData = (data) => {
  var dia = data.split("/")[0];
  var mes = data.split("/")[1];
  var ano = data.split("/")[2];

  return data.split('/').reverse().join('-');
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

const rollbackFormatStringData = (data) => {
  var ano = data.split("-")[0];
  var mes = data.split("-")[1];
  var dia = data.split("-")[2];

  return data.split('-').reverse().join('/');
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}







function User(props) {

  const [redirect, setRedirect] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      name: record.name
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });



useEffect(() =>{
 
 

},[])



  const onSubmit = async (values) => {
      // setLoading(true)
      // values.date_birth= formatStringData(values.date_birth)
      // await localStorage.setItem("@bidu2/user", JSON.stringify(values))


      // setRedirect(true)


      console.log(values)

       
     
  };

  if(redirect)
   return <Redirect to="/checkout/:id" />;


  return (
    <>
      <Wrapper>


        <Steps step1={true} step2={true} />
        <Title text="Dados" bold="Complementares" />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <Grid container spacing={2} >

              {inputsForm.map((input) => (

                 <Grid item xs={12} sm={8}>
               { input.type == "radio" && (
                 
                    <RadioFormItem
                      name={input.name}
                      label={input.label}
                      row={true}
                      options={input.options}
                      required={input.required}
                    />
                  
                )
                ||
                (
                  input.type == "text" && input.mask == undefined &&


                    <InputFormItem
                      name={input.name}
                      label={input.label}
                      required={input.required}
                      placeholder={input.placeholder || ""}
                    />

                )
                ||
                (
                  input.type == "text" && input.mask &&

                
                    <MaskFormItem
                      name={input.name}
                      label={input.label}
                      required={input.required}
                      placeholder={input.placeholder || ""}
                      mask={input.mask}
                      onChange={(e) => e.target.value}
                    />

                  
                )
                ||
                (
                  input.type == "autocomplete"  &&

                
                    <AutoCompleteFormItem
                      name={input.name}
                      label={input.label}
                      required={input.required}
                      placeholder={input.placeholder || ""}
                      options={input.options}
                    />

                  
                )}
                </Grid>


              ))}
              <Title text="Dados" bold="do Documento" />
              {inputsFormDocument.map((input) => (

                          <Grid item xs={12} sm={8}>
                          { input.type == "radio" && (

                            <RadioFormItem
                              name={input.name}
                              label={input.label}
                              row={true}
                              options={input.options}
                              required={input.required}
                            />
                          
                          )
                          ||
                          (
                          input.type == "text" && input.mask == undefined &&


                            <InputFormItem
                              name={input.name}
                              label={input.label}
                              required={input.required}
                              placeholder={input.placeholder || ""}
                            />

                          )
                          ||
                          (
                          input.type == "text" && input.mask &&


                            <MaskFormItem
                              name={input.name}
                              label={input.label}
                              required={input.required}
                              placeholder={input.placeholder || ""}
                              mask={input.mask}
                              onChange={(e) => e.target.value}
                            />

                          
                          )
                          ||
                          (
                          input.type == "autocomplete"  &&


                            <AutoCompleteFormItem
                              name={input.name}
                              label={input.label}
                              required={input.required}
                              placeholder={input.placeholder || ""}
                              options={input.options}
                            />

                          
                          )}
                          </Grid>


                          ))}
              {loading && <Loading />}
            </Grid>
            <br />
            <div className="actions pme-actions">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                className="btn-next about-btn-next"
                onClick={form.handleSubmit(onSubmit)}
              // disabled={!this.state.opt}
              >
                Próximo
                  </Button>
            </div>

          </form>
        </FormProvider>
      </Wrapper>
    </>
  );
}



export default User
