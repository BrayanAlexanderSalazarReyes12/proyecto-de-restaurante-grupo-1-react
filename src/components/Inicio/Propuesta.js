import React, { useEffect, useState } from 'react'
import { UseFetch } from '../../hooks/UseFetch';
import { app } from './../../data/bd';

export const Propuesta = () => {

    const [state, setState] = useState([])

    const { data } = UseFetch(`https://localhost:44380/api/propuesta`)

    useEffect(() => {
        if(!!data){
            setState(data[0])
            console.log(data)
        }
    },[data])
    

    return (
        <>
            <div class="main_prensent justify-content-center">
                <img src={state.ImgPropuesta} alt="" width="100%" height="450px" />  
                <div class="txt_pre" style={mensaje}>
                    <h1>{state.TituloPropuesta}</h1>
                    <p className="textoo">{state.TextoPropuesta}</p>
                </div> 
            </div>
        </>
    )
}

const mensaje = {
    border: '1px solid white',
    width: '90%',
    backdropFilter: 'blur(8px)',
    borderRadius: '10px',
    color: 'black',
}
