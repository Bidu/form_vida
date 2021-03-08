import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import yupFormSchemas from './yupFormSchemas'


function yupFormValidateObject(props){
    console.log(props)
    const formValidation = () => {
        let objetivo = []
        let elemento = []
        let filesJsons = [...props]
      
        filesJsons.map((e, key) => {
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
      
      const schema = yup.object().shape(formValidation());

     return schema
}


export default yupFormValidateObject