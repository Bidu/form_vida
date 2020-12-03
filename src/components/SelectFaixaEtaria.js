import React from 'react'

export default (props) =>{
    return (
        <>
        <InputLabel shrink id={props.values.id}>
                                        {props.values.value}
                                  </InputLabel>
                <Select
                name={props.values.id}
                fullWidth
                displayEmpty
                labelId={props.values.id}
                id={props.values.id}
                value={
                  
                }
                onChange={handleChange(props.values.id)}
                onBlur={this.handleChange}
                >
            <MenuItem value="" disabled>
                Selecione
            </MenuItem>
            {   props.personPorFaixa.pessoasPorFaixa.map((f, key)=>(
                <MenuItem value={f} key={key}>{f}</MenuItem>
            ))}
            </Select>
        </>
)
}