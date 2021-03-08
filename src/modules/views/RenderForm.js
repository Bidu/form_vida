import React, {useEffect} from 'react' 
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import InputFormItem from './InputFormItem'
import RadioFormItem from './RadioFormItem'
import MaskFormItem from './MaskFormItem'
import AutoCompleteFormItem from './AutoCompleteFormItem'
import yupFormSchemas from '../yup/yupFormSchemas'
import { Grid } from "@material-ui/core"


function RenderForm(props){
      return(
          <>
            {props.inputs.map((input) => (

             <Grid item xs={props.xs} sm={props.sm}  style={ props.center && { width: '100%', marginLeft: 'auto', marginRight: 'auto' } }  >
                 <br/>
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
          </>
      )
}


export default RenderForm